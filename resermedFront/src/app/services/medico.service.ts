import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMantenedor, IMedico } from '../interfaces/interfaces';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class MedicoService{

  private readonly api_url = `${base_url}/medicos`;
  doctoresLibres!:IMedico[];
  medicos!:IMedico[];
  medicoSelected!: IMedico;
  

  constructor(private http: HttpClient) { }


  getMedicos(): Observable<IMedico[]>{
    return this.http.get<any>(this.api_url);
  }

  getMedicoById(id: number): Observable<IMedico>{
    return this.http.get<any>(`${this.api_url}/${id}`);
  }

  getMedicosByMantenedor(id:number): Observable<IMedico[]>{
    return this.http.get<any>(`${base_url}/medicosByM/${id}`);
  }
  getMedicosLibres(): Observable<IMedico[]>{
    return this.http.get<any>(`${base_url}/medicosLibres`);
  }

  updateIdMantenedorMedico(idMedico:number,idMantenedor:number):Observable<any>{
    return this.http.put<any>(`${base_url}/medicoIdMant/${idMedico}/${idMantenedor}`,{});
  }
  updateIdMantenedorMedicoNull(idMedico:number):Observable<any>{
    return this.http.put<any>(`${base_url}/medicoIdMant/${idMedico}`,{});
  }

  updateMedico(newMed = {}, id: number): Observable<IMedico> {
    return this.http.put<any>(`${this.api_url}/${id}`, newMed);
  }

  deleteMedico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api_url}/${id}`);
  }
}
