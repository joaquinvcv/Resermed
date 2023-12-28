import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IMedico } from 'src/app/interfaces/interfaces';
import { MedicoService } from 'src/app/services/medico.service';
import { ShowModalService } from '../../service/show-modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-doctor',
  templateUrl: './nuevo-doctor.component.html',
  styleUrls: ['./nuevo-doctor.component.scss']
})
export class NuevoDoctorComponent implements OnInit,OnDestroy{

  //doctoresLibres!:IMedico[];
  
  idMant:number = 0;
  mostrar!:boolean;
  data:string = '';
  
  p: number = 0;
  total: number = 0;

  @Output()
  public onNewMedico: EventEmitter<IMedico>= new EventEmitter();

  constructor(public medicoService: MedicoService,public modalShow: ShowModalService, private toast:ToastrService){
    console.log(this.modalShow.mostrar)
  }
  
  ngOnDestroy(): void {
  }
  

  ngOnInit(): void {
    this.medicoService.getMedicosLibres().subscribe(data=>{
      this.medicoService.doctoresLibres = data;
    })
    
    this.total = this.medicoService.doctoresLibres.length;
    
  }
  updateArray(){

  }

  cerrarModal(){
    this.modalShow.ocultarModal();
  }

  addMedico(idDoc:number,item:any,index:number){
    let user = localStorage.getItem("currentUser");
    let id;
    if(user){
      const tokenData = JSON.parse(user);
      id = tokenData.id;
      this.idMant = id;
      console.log(idDoc, " ",id);
      this.medicoService.updateIdMantenedorMedico(idDoc,id).subscribe(res=>{
        this.success();
        this.onNewMedico.emit(item);
        
        let i = this.medicoService.doctoresLibres.indexOf(item);
        if(i != -1){
          this.medicoService.doctoresLibres.splice(i,1);
        }
        
        
      }, error =>{
        console.log(error);
      }
      );
      
    }
    
  }

  success(){
    this.toast.success("Se ha añadido el médico correctamente","AgregarMedico",{timeOut: 5000});
  }
}
