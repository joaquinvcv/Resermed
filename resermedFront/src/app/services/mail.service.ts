import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url_api;
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http:HttpClient,private toats:ToastrService) { }
  

  enviarCorreo(body:any):Observable<any>{
    return this.http.post<any>(`${base_url}/contacto`,body);
  }

  showNotification() {
    this.toats.success('¡Hemos enviado tu correo a resermed!');
  }

  correoCancelar(body = {}):Observable<any>{

    return this.http.post<any>(`${base_url}/cancelar`,body);
  }

  correoReservar(body = {}):Observable<any>{

    return this.http.post<any>(`${base_url}/mailReservar`,body);
  }
  
}
