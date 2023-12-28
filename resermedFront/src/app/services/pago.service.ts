import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private readonly api_url = base_url;


  constructor(private http: HttpClient) { }

  pagar(idUser: number, idCita: number, redirection: string): Observable<any> {
    return this.http.post<any>(`${this.api_url}/pagoUsuario`, {idUser, idCita, redirection});
  }
}
