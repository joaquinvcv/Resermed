import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMantenedor, IMedico, IUsuario } from '../interfaces/interfaces';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  
    private Amessage = new BehaviorSubject('');
    current = this.Amessage.asObservable();

    private readonly api_url = base_url;

    constructor(private http: HttpClient) { }

    updateAmessage(message: string){
        this.Amessage.next(message);
    }

    registroUsuario(newUser = {}):Observable<IUsuario>{
      return this.http.post<any>(`${this.api_url}/usuarios`,newUser);
    }

    registroMedico(newMed= {}):Observable<IMedico>{
      return this.http.post<any>(`${this.api_url}/medicos`,newMed);
    }

    registroMantenedor(newMan= {}):Observable<IMantenedor>{
      return this.http.post<any>(`${this.api_url}/mantenedores`,newMan);
    }

}
