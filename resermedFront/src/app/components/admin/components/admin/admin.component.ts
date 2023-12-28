import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  menuSelected: string = ''; 

  constructor(private router: Router, private footerS:FooterService){}


  ngOnInit(): void {
    this.verificarRuta();
    this.footerS.changeShowFooter();
  }

  verificarRuta(){
    this.menuSelected = this.router.url;
    console.log(this.menuSelected)
  }


}
