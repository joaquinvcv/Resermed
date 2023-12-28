import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggle: boolean = false;
  userType: any;
  public session!: Observable<boolean>;
  rol: string = "";
  sessionOn: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {

    const tokenDataString = localStorage.getItem('currentUser');

    this.session = this.loginService.getSession();

    this.session.subscribe( (data) => {
      this.sessionOn = data;
      if(this.sessionOn === true){
        this.getUser();
      }
    })

    if(this.sessionOn === false){
      this.getSesion()
    }else if(this.sessionOn === true){
      this.getUser();
    }
  }

  toggleMenu() {
    if (!this.toggle) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }


  cerrarSesion() {
    this.loginService.logout();
  }

  getSesion(){
    const tokenDataString = localStorage.getItem('currentUser');
    if(tokenDataString != null){
      this.sessionOn = true;
      if(tokenDataString){
        const tokenData = JSON.parse(tokenDataString);
        const id = tokenData.userType;
        this.userType = id;
      }
    }
  }

  getUser(){
    const tokenDataString = localStorage.getItem('currentUser');
    if(tokenDataString != null){
      const tokenData = JSON.parse(tokenDataString);
      this.userType = tokenData.userType;
    }
  }
}
