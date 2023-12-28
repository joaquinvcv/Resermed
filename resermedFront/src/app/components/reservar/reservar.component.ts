import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICita, IMedico, IUsuario } from 'src/app/interfaces/interfaces';
import { FromCurrentDatePipe } from 'src/app/pipes/from-current-date.pipe';
import { CitasService } from 'src/app/services/citas.Service';
import { MailService } from 'src/app/services/mail.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PagoService } from 'src/app/services/pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss']
})
export class ReservarComponent implements OnInit {
  precio: number = 0;
  filtroFecha!: Date;
  citasDisponibles: ICita[] = [];
  medicoId: number = 0;
  medico!: IMedico;
  user!: IUsuario;
  currentDate!: Date;



  constructor(
    private citas: CitasService, 
    private route: ActivatedRoute, 
    private medicoService: MedicoService, 
    private toastr: ToastrService, 
    private pago: PagoService, 
    private mail: MailService, 
    private usuarioS: UsuarioService
    ) { }

  ngOnInit(): void {
    this.currentDate = new Date();

    this.medicoId = this.route.snapshot.params['id'];

    this.medicoService.getMedicoById(this.medicoId).subscribe((res) => {
      this.medico = res;
    })

    this.citas.getCitas().subscribe((res) => {
      this.citasDisponibles = res;

    });

    this.usuarioS.getUsuarioById(this.currentUserId).subscribe((res) => {
      this.user = res;
    })


  }

  get citasRecientes(): any[] {
    let filteredArray = this.citasDisponibles.sort((a,b) =>{
      const aDate = new Date(`${a.fecha}T${a.hora_inicio}`).getTime();
      const bDate = new Date(`${b.fecha}T${b.hora_inicio}`).getTime();
      
      return aDate - bDate;
    });
    const fromCurrentDate = new FromCurrentDatePipe();
    filteredArray = fromCurrentDate.transform(filteredArray);
    return filteredArray.slice(0, 20);

  }

  get currentUserId() {
    const tokenDataString = localStorage.getItem('currentUser');
    if (tokenDataString) {
      const tokenData = JSON.parse(tokenDataString);
      const id = tokenData.id;

      return id;
    }
  }

  showSuccess() {
    this.toastr.success('Éxito', 'Cita reservada correctamente');
  }

  showError() {
    this.toastr.error('Fracaso', 'Hubo un error al reservar');
  }

  reservarCita(cita: ICita, observacion: string) {


    let userId = this.currentUserId;


    cita.UsuarioId = userId;
    cita.libre = false;
    if (observacion != null) {
      cita.observacion = observacion
    }

    this.citas.updateCita(cita, cita.id).subscribe((res) => {
      this.showSuccess();
      let body = {
        nombre1: this.user.nombre,
        apellido1: this.user.apellido,
        nombre2: this.medico.nombre,
        apellido2: this.medico.apellido,
        email1: this.user.email,
        email2: this.medico.email,
        fecha: cita.fecha,
        hora1: cita.hora_inicio,
        hora2: cita.hora_termino
      }
      this.mail.correoReservar(body).subscribe((res) => {
        console.log('mail enviado');

      })

    },
      (error) => {
        this.showError();
      })


  }

  reservarPagarCita(cita: ICita, observacion: string) {
    //redireccionar a pagos y luego actualizar estado de pago en cita si es exitoso 
    let idUser = this.currentUserId;


    cita.UsuarioId = idUser;
    cita.libre = false;
    cita.pagada = true;

    if (observacion != null) {
      cita.observacion = observacion
    }

    this.citas.updateCita(cita, cita.id).subscribe((res) => {

      let body = {
        nombre1: this.user.nombre,
        apellido1: this.user.apellido,
        nombre2: this.medico.nombre,
        apellido2: this.medico.apellido,
        email1: this.user.email,
        email2: this.medico.email,
        fecha: cita.fecha,
        hora1: cita.hora_inicio,
        hora2: cita.hora_termino
      }

      this.pago.pagar(idUser, cita.id, `${window.location.host}/#/citas`).subscribe((res) => {


        window.location.href = res.body;
        

        this.mail.correoReservar(body).subscribe((res) => {
          console.log('mail enviado');
    
    
    
        },
          (error) => {
            this.showError();
          });


      },
        (error) => {
          console.log(error);
          this.showError();


        })

    })




  }
}
