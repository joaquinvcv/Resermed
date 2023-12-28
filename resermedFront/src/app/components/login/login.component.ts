import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private toastr: ToastrService){
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {

  }

  showSuccess(){
    this.toastr.success('Éxito', 'Sesión iniciada correctamente');
  }

  showError(){
    this.toastr.error('Error al iniciar sesión', 'Credenciales incorrectas');
  }

  showWarning(){
    this.toastr.warning('Credenciales inválidas', 'Ingrese credenciales válidas');
  }


  onLoginSubmit(){
    if(this.loginForm.valid){
      let email = this.loginForm.get('email')?.value;
      let pass = this.loginForm.get('password')?.value;

      let cuenta = {
        email: email,
        password: pass
      }

      this.loginService.login(cuenta).subscribe({
        next: (res) => {
          this.loginService.setSession(true);
          this.router.navigate(['/home']);
          this.showSuccess();
        },
        error: (err) => {
          this.showError();
        }
      })
    }else{
      this.showWarning();
    }
  }

}
