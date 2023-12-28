import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMantenedor } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

const base_url = environment.url_api;


@Injectable({
  providedIn: 'root'
})
export class MantenedorService {

  private readonly api_url = `${base_url}/mantenedores`;


  constructor(private http: HttpClient) { }

  getMantenedorById(id: number): Observable<IMantenedor>{
    return this.http.get<any>(`${this.api_url}/${id}`);
  }

  updateMantenedor(newMant = {}, id: number): Observable<IMantenedor> {
    return this.http.put<any>(`${this.api_url}/${id}`, newMant);
  }

  deleteMantenedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api_url}/${id}`);
  }
}
