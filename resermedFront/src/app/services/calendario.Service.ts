import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICita } from "../interfaces/interfaces";

const base_url = environment.url_api;

@Injectable({
    providedIn: 'root'
})
export class CalendarioService {

    private readonly api_url = base_url;

    constructor(private http: HttpClient){}

    getAllcitasOcupadasById(rol:string, id:number): Observable<ICita[]>{
        return this.http.get<ICita[]>(`${this.api_url}/citasOcupadas/${rol}/${id}`);
    }
}