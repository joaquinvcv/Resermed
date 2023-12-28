import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICita, IUsuario } from 'src/app/interfaces/interfaces';
import { CitasService } from 'src/app/services/citas.Service';
import { MailService } from 'src/app/services/mail.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PagoService } from 'src/app/services/pago.service';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})


export class PacientesComponent {
  
  constructor(public medicoService: MedicoService, 
    private citaService: CitasService, 
    private toast:ToastrService,
    private pago: PagoService,
    private mail: MailService
  ){}
  
  citasMedicas!:ICita[];
  checkbox: boolean = false;
  indice!: number;
  citaSeleccionada!: {
    user1: IUsuario,
    cita: ICita,
    indice: number
  }

  public paciente = {
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    telefono: 0
  }

  public cita = {
    id: 0,
    estadoPago: '',
    costo: 0,
    observaciones: '',
    asiste: false
  }

  
  mostrarCitas(){
    this.citaService.getCitasByIdMed(this.medicoService.medicoSelected.id).subscribe(data=>{
      this.citaService.citasMedico = data;
      this.citasMedicas = this.citaService.citasMedico;

    });
    console.log(window.location.host);
  }

  mostrarDatosPaciente(user:any){
    
    this.citaSeleccionada = user;
    console.log(this.citaSeleccionada);
    this.paciente.nombre = user.user1.nombre;
    this.paciente.apellido = user.user1.apellido;
    this.paciente.email= user.user1.email;
    this.paciente.rut = user.user1.rut;
    this.paciente.telefono = user.user1.telefono;

    this.cita.id = user.cita.id;
    this.cita.estadoPago = user.cita.pagada == true? 'pagado' : 'pendiente';
    this.cita.costo = user.cita.costo;
    this.cita.observaciones = user.cita.observacion;
    user.cita.asiste == true? this.checkbox = true : this.checkbox = false; 
    this.indice = user.index;
    
  }

  
  guardarAsistencia(){
    if(this.cita.id == 0){
      this.toast.error("No hay una cita seleccionada","Error",{timeOut:5000});      
    }else{
      console.log(this.cita.id, this.checkbox);
      this.citaService.updateCitaAsistencia(this.cita.id,this.checkbox).subscribe(res=>{
        this.toast.info("Asistencia actualizada","Información",{timeOut:5000})
        this.citaSeleccionada.cita.asiste = this.checkbox;

      },error=>{
        this.toast.error("Ocurrió un error al actualizar la asistencia","error",{timeOut:5000}); 
      });

      console.log(this.citasMedicas[this.indice]);
      
    }
  }

  pagarCita(){
    if(this.citaSeleccionada.cita.pagada == false && this.citaSeleccionada.cita.asiste == true){
      let idUser = this.citaSeleccionada.user1.id;
      let idCita = this.citaSeleccionada.cita.id;
      console.log(idCita,idUser);
      this.pago.pagar(idUser,idCita,`${window.location.host}/#/admin/pacientes`).subscribe(res=>{
        window.location.href = res.body;
        //this.mail.correoReservar(body);
        this.citaSeleccionada.cita.pagada = true;
        
        this.citaService.updateCita(this.citaSeleccionada.cita,idCita).subscribe(resp=>{
          this.mail.correoReservar(this.citaSeleccionada.cita);
        });
      });
    }else{
      this.toast.info("Pago no procesado","Información",{timeOut:5000})
    }
  }
}
