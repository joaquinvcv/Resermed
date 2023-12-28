import { Component, OnInit } from '@angular/core';
import { ICita, IMedico, IUsuario } from 'src/app/interfaces/interfaces';
import { CitaByMedFilterPipe } from 'src/app/pipes/cita-by-med-filter.pipe';
import { CitaByUserFilterPipe } from 'src/app/pipes/cita-by-user-filter.pipe';
import { CitaOcupadaPipe } from 'src/app/pipes/cita-ocupada.pipe';
import { FromCurrentDatePipe } from 'src/app/pipes/from-current-date.pipe';
import { CitasService } from 'src/app/services/citas.Service';
import { ModalDetallesService } from 'src/app/services/modal-detalles.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit{

  cita!: ICita;

  userId: number = 0;
  medId: number = 0;
  userType: string = '';
  citas: any[] = [];


  constructor(public modalService: ModalDetallesService, private citaService: CitasService, private usuarioS: UsuarioService){}
  

  abrirModal(cita:any){
    this.cita = cita;    
    this.modalService.mostrarModal();
  }

  ngOnInit(): void {
    let user = localStorage.getItem("currentUser");

    if(user){
      const tokenData = JSON.parse(user);
      this.userType = tokenData.userType;
      if(this.userType == 'usuario'){
        this.userId = tokenData.id;
      }else{
        this.medId = tokenData.id;
      }
    }
    
    this.citaService.getCitas().subscribe((res)=>{
      this.citas = res;
      this.citas.sort((a,b) =>{
        const aDate = new Date(`${a.fecha}T${a.hora_inicio}`).getTime();
        const bDate = new Date(`${b.fecha}T${b.hora_inicio}`).getTime();
        
        return aDate - bDate;
      });
      
      
    }),
    (error: any)=>{
      console.log(error);
      
    };
    
    
  }

  get proxCita(){
    
    
    const fromCurrentDate = new FromCurrentDatePipe();
    const citaOcupada = new CitaOcupadaPipe();
    let arr = fromCurrentDate.transform(this.citas);
    arr = citaOcupada.transform(arr);
    
    if(this.userType == 'usuario'){
      const byUserPipe = new CitaByUserFilterPipe();
      arr = byUserPipe.transform(arr, this.userId);
    }else{
      const byMedPipe = new CitaByMedFilterPipe();
      arr = byMedPipe.transform(arr, this.medId);
    }
    
    return arr[0];
  }

  get citasProximas() {

    const fromCurrentDate = new FromCurrentDatePipe();
    let arr = this.citas;
    arr = fromCurrentDate.transform(arr);
    if(this.userType == 'usuario'){
      const byUserPipe = new CitaByUserFilterPipe();
      arr = byUserPipe.transform(arr, this.userId);
    }else{
      const byMedPipe = new CitaByMedFilterPipe();
      arr = byMedPipe.transform(arr, this.medId);
    }
    arr = arr.slice(1);
   
    return arr;
  }


}
