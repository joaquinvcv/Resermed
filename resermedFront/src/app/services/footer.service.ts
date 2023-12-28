import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FooterService {
  showFooter: boolean = true;
  
  constructor() { }
  oculto = '';

  changeShowFooter(){
    this.showFooter = !this.showFooter;
  }

  abrirModal(){
    this.oculto = 'block';
  }
  ocultarModal(){
    this.oculto = 'none';
  }
}
