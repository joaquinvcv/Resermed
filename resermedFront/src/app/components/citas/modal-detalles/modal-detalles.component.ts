import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICita, IMedico, IUsuario } from 'src/app/interfaces/interfaces';
import { CitasService } from 'src/app/services/citas.Service';
import { MailService } from 'src/app/services/mail.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalDetallesService } from 'src/app/services/modal-detalles.service';
import { PagoService } from 'src/app/services/pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.scss']
})
export class ModalDetallesComponent implements OnChanges {

  @Input() cita: any;
  @Input() userType: any;
  medico!: IMedico;
  paciente!: IUsuario; 

  constructor(
    public modalService: ModalDetallesService, 
    private pago: PagoService, 
    private citas: CitasService, 
    private toastr: ToastrService, 
    private mail: MailService,
    private userS: UsuarioService,
    private medS: MedicoService
    ) {


  }
  ngOnChanges(): void {
    this.userS.getUsuarioById(this.cita.UsuarioId).subscribe((res)=>{
      this.paciente = res;
    });

    this.medS.getMedicoById(this.cita.MedicoId).subscribe((res)=>{
      this.medico = res;
    });
   
  }


  ocultarModal() {
    this.modalService.ocultarModal();
  }

  showSuccesCancelled() {
    this.toastr.success('Éxito', 'Su cita ha sido cancelada');
  }

  showError() {
    this.toastr.error('Error', 'Hubo un error al pagar');
  }

  pagarCita() {

    let paid = this.cita;
    paid.pagada = true;

    this.citas.updateCita(paid, paid.id).subscribe((res) => {


      this.pago.pagar(this.paciente.id, paid.id, `${window.location.host}/#/citas`).subscribe((res) => {


        window.location.href = res.body;
        
      },
        (error) => {
          this.showError();


        })

    })


  }

  cancelarCita() {
    let cancelled = this.cita;
    cancelled.UsuarioId = null;
    cancelled.libre = true;

    this.citas.updateCita(cancelled, cancelled.id).subscribe((res)=>{
      this.showSuccesCancelled();

      let body = {
        nombre1: this.paciente.nombre,
        apellido1: this.paciente.apellido,
        nombre2: this.medico.nombre,
        apellido2: this.medico.apellido,
        email1: this.paciente.email,
        email2: this.medico.email,
        fecha: cancelled.fecha,
        hora1: cancelled.hora_inicio,
        hora2: cancelled.hora_termino
      }

      this.modalService.ocultarModal();

      this.mail.correoCancelar(body).subscribe((res)=>{
        console.log('mail enviado');
        
      })
    })
    
  }
}
