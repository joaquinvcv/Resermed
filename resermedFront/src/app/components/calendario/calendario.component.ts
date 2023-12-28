import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es'
import { ICita } from 'src/app/interfaces/interfaces';
import { CalendarioService } from 'src/app/services/calendario.Service';
import { concat } from 'rxjs';
import { ModalDetallesService } from 'src/app/services/modal-detalles.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  event: any = {
    title: "",
    start: "",
    end: "",
    id: ""
  }

  evento: ICita[] = [];
  user: string | any = "";
  id: number = 0;
  rol: string = "";
  start: string = "";
  end: string = "";

  data: any = {};

  constructor(public calenService: CalendarioService, public modalService: ModalDetallesService) { }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth',
    },
    editable: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
    },
    eventClick: (calEvent: any) => {
      let data = {
        title: calEvent.event.title,
        start: calEvent.event.start,
        end: calEvent.event.end,
        id: calEvent.event.id
      };
      this.openModal(data);
    },
    locale: esLocale
  };

  eventClick(model: any){
    alert(model.event.title)
  }

  ngOnInit(): void {
    this.getUser();

    this.calenService.getAllcitasOcupadasById(this.rol, this.id).subscribe((data) => {
      this.evento = data;

      this.getEvents();
    })
  }

  getEvents() {
    let array:any = [];
    let cont = 1;
    let date = new Date();
    let month = date.getMonth()+1;
    let day = "";
    if(month < 10){
      day = date.getFullYear() + "-" + "0" + month + "-" + date.getDate();
    }else{
      day = date.getFullYear() + "-" + month + "-" + date.getDate();
    }

      this.evento.map(e => {

        this.event = [];

        this.event.title = "Cita " + cont;
        this.event.start = e.fecha.toString().concat("T"+e.hora_inicio);
        this.event.end = e.fecha.toString().concat("T"+e.hora_termino);
        this.event.id = e.id

        if(Date.parse(e.fecha) < Date.parse(day)){
          this.event['backgroundColor'] = 'red';
        }else if(Date.parse(e.fecha) == Date.parse(day)){
          this.event['backgroundColor'] = 'blue';
        }else if(Date.parse(e.fecha) > Date.parse(day)){
          this.event['backgroundColor'] = 'green';
        }

        array.push(this.event);

        console.log(this.event)

        cont ++;

      });
    this.calendarOptions.events = array;
  }

  getUser() {
    this.user = localStorage.getItem("currentUser");
    if (this.user) {
      const tokenData = JSON.parse(this.user);
      this.id = parseInt(tokenData.id);
      this.rol = tokenData.userType;
    }
    this.getEvents();
  }

  openModal(data:any){
    this.data = data;
    this.modalService.mostrarModal();
  }
}
