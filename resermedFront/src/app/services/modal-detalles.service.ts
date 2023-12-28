import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalDetallesService {
  public citaProx!:any;
  public oculto:string = '';
  public citaActual!:any;
  tipo:string = '';
  modal:boolean = false;
  img:string = '';

  

  constructor(
  ) { 
      
  }

  ocultarModal(){
    this.oculto = '';
    this.modal = false;
  }

  mostrarModal(){
    this.oculto = 'block';
    this.modal = true;
  }


  
}
