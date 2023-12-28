import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.scss']
})
export class FormularioContactoComponent implements OnInit{
  
  public contacto!: FormGroup;

  constructor( private formBuilder: FormBuilder, private mailS:MailService ) { }
  
  ngOnInit(): void {
    this.buildForm();
  }
  
  
  private buildForm(){
    this.contacto = this.formBuilder.group({
      
      nombre: ['', Validators.required],
      email: ['', [
        Validators.required, Validators.email
      ]],
      telefono: [0, [
        Validators.required, Validators.minLength(9)
      ]],
      sobreMi: ['']
    });
  }

  enviarCorreo(){
    let body = {
      nombre: this.contacto.get("nombre")?.value,
      email: this.contacto.get("email")?.value,
      telefono: this.contacto.get("telefono")?.value,
      sobreMi: this.contacto.get("sobreMi")?.value
    }
      this.mailS.enviarCorreo(body).subscribe((res)=>{
        console.log(res);
        this.mailS.showNotification();
      });
      this.contacto.reset();
  }
}
