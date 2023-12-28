import { Component, OnInit } from '@angular/core';
import { IMedico } from 'src/app/interfaces/interfaces';
import { MedicoService } from 'src/app/services/medico.service';
import { ShowModalService } from '../service/show-modal.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit{

  p: number = 1;
  total: number = 0;
  arrayMedicos!:IMedico[];
  //medicos!:IMedico[];
  modal:boolean = false;
  
  constructor(public medicoS:MedicoService,public modalShow: ShowModalService,private toast:ToastrService){
    
  }

  ngOnInit(): void {
    let user = localStorage.getItem("currentUser");
    let id;
    if(user){
      const tokenData = JSON.parse(user);
      id = tokenData.id;
      let tipo = tokenData.userType;
      if(tipo == "mantenedor"){
        this.medicoS.getMedicosByMantenedor(id).subscribe(data=>{
          this.medicoS.medicos = data;
          
        });
      }
    }
    this.total = this.medicoS.medicos.length;
  }

  nuevoDoctor(){
    this.abrirModal();
  }

  quitarMedico(id:number,item:any){

    Swal.fire({
      title: '¿Deseas desvincular con el médico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Desvincular',
      cancelButtonText: 'Cancelar'

    }).then((result)=>{
      if(result.isConfirmed){
        this.medicoS.updateIdMantenedorMedicoNull(id).subscribe(res=>{
          let i = this.medicoS.medicos.indexOf(item);
          if(i != -1){
            this.medicoS.medicos.splice(i,1);
          }
          this.success();
          
        });
      }
    })

     
  }

  abrirModal(){
    this.modalShow.mostrarModal();
  }
  cerrarModal(){

    this.modalShow.ocultarModal();
  }

  success(){
    this.toast.success("se ha desvinculado de un médico","desvincular medico",{timeOut: 5000});
  }

  onNewMedico(medico: IMedico):void{
    console.log(medico);
    this.medicoS.medicos.push(medico);
  }
}
