import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  showFooter: boolean;
  constructor(public footerS:FooterService, private router:Router){
    this.showFooter = footerS.showFooter;
  }

  abrirModal(){
    this.footerS.abrirModal();

  }
  ocultarModal(){
    this.footerS.ocultarModal();
  }
}
