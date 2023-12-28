import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, map } from 'rxjs';
import { DecodedToken } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public session = new BehaviorSubject<boolean>(false);
  private readonly api_url = `${base_url}/login`;

  constructor(private http: HttpClient) {
    let storageCurrentUser: string = String(localStorage.getItem('currentUser'));

    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser') ? JSON.parse(storageCurrentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any{
    return this.currentUserSubject.value;
  }


  login(cuenta = {}): Observable<any> {
    
    return this.http.post<any>(`${this.api_url}`, cuenta).pipe(map((user) =>{
      if(user && user.token){
        const decodedToken = jwt_decode(user.token) as DecodedToken;
        user.id = decodedToken.id;
        user.userType = decodedToken.userType;
        user.nombre = decodedToken.nombre;
        user.email = decodedToken.email;
        user.exp = decodedToken.exp;
        user.iat = decodedToken.iat;

        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  setSession(si:boolean){
    this.session.next(si);
  }

  getSession(){
    return this.session.asObservable();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.reload();
  }


}
