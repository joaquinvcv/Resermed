import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  modal:boolean = false;
  mostrar: string = '';
  constructor() { }

  ocultarModal(){
    this.modal = false;
    this.mostrar = 'none';
  }

  mostrarModal(){
    this.modal = true;
    this.mostrar = 'block';
  }
}
