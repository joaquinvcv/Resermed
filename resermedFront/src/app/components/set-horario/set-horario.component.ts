import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICita, ParamCitas } from 'src/app/interfaces/interfaces';
import { CitasService } from 'src/app/services/citas.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-horario',
  templateUrl: './set-horario.component.html',
  styleUrls: ['./set-horario.component.scss']
})
export class SetHorarioComponent implements OnInit {

  cantC:number = 0;
  inicio: any;
  termino: any;
  user: string | any = "";
  currentDate!: Date;
  newCita:ICita = {
    id: 0,
    fecha: "",
    hora_inicio: "",
    hora_termino: "",
    observacion: "",
    asiste: false,
    pagada: false,
    libre: true,
    costo: 0,
    UsuarioId: null,
    MedicoId: 1
  };

  newParams: ParamCitas = {
    duracion: 0,
    intervalo: 0,
    protegido1: "nada",
    protegido2: "nada",
    jornadaI: "",
    jornadaT: "",
    costo: 0
  }

  constructor(public citaS: CitasService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  citaDia(fecha:any, inicio:any, termino:any, costo:any){
    
    this.user = localStorage.getItem("currentUser");
    if(this.user){
      const tokenData = JSON.parse(this.user);
      const id = tokenData.id;
      this.newCita.MedicoId = parseInt(id);
    }

    this.newCita.fecha = fecha;
    this.newCita.hora_inicio = inicio;
    this.newCita.hora_termino = termino;
    this.newCita.costo = costo;

    this.citaS.crearCita(this.newCita).subscribe((res) => {
      this.showSuccess();
    }, (error) => {
      this.showError();
    });
  }

  showSuccess(){
    this.toastr.success('Éxito', 'Cita creada correctamente');
  }

  showSuccessSemana(){
    this.toastr.success('Éxito', 'Citas creadas correctamente');
  }

  showError(){
    this.toastr.error('Fracaso', 'Verifique que ingresó un costo y parámetros de cita');
  }

  citaSemana(duracion: any, intervalo:any, protegido1:any, protegido2: any, jornadaI:any, jornadaT:any, costo: any){

    let date = new Date();
    let dia, day;
    day = 6;
    if(day == 0 || day == 6){
      if(date.getDay() == 6){
        dia = "Sabado";
      }else{
        dia = "Domingo";
      }
      Swal.fire({
        title: "Hoy es " + dia,
        text: "¿Desea agendar las citas para la proxima Semana?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Agendar la proxima semana",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if(result.value){

          this.user = localStorage.getItem("currentUser");
          if(this.user){
            const tokenData = JSON.parse(this.user);
            const id = tokenData.id;
            this.newCita.MedicoId = parseInt(id);
          }
      
          this.newParams.duracion = duracion;
          this.newParams.intervalo = intervalo;
          if(protegido1 == "" && protegido2 == ""){
            this.newParams.protegido1 = "nada";
            this.newParams.protegido2 = "nada";
          }else{
            this.newParams.protegido1 = protegido1;
            this.newParams.protegido2 = protegido2;
          }
      
          this.newParams.jornadaI = jornadaI;
          this.newParams.jornadaT = jornadaT;
          this.newParams.costo = costo;
      
          this.citaS.crearCitaSema(this.newParams, this.newCita.MedicoId).subscribe( (res) => {
            this.showSuccessSemana();
          }, (error) => {
            this.showError();
          })

          Swal.fire("Creadas", "Sus citas fueron creadas para la proxima semana", "success")
        }else if (result.dismiss === Swal.DismissReason.cancel){
          Swal.fire("Accion cancelada", "Citas no creadas", "error");
        }
      })
    }else{

      this.user = localStorage.getItem("currentUser");
      if(this.user){
        const tokenData = JSON.parse(this.user);
        const id = tokenData.id;
        this.newCita.MedicoId = parseInt(id);
      }
  
      this.newParams.duracion = duracion;
      this.newParams.intervalo = intervalo;
      if(protegido1 == "" && protegido2 == ""){
        this.newParams.protegido1 = "nada";
        this.newParams.protegido2 = "nada";
      }else{
        this.newParams.protegido1 = protegido1;
        this.newParams.protegido2 = protegido2;
      }
  
      this.newParams.jornadaI = jornadaI;
      this.newParams.jornadaT = jornadaT;
      this.newParams.costo = costo;
  
      this.citaS.crearCitaSema(this.newParams, this.newCita.MedicoId).subscribe( (res) => {
        this.showSuccessSemana();
      }, (error) => {
        this.showError();
      })

    }
  }
}