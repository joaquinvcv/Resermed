import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.loginService.currentUserValue;
    if (currentUser) {
      // Verificar fecha de expiración del token
      const expirationDate = new Date(currentUser.exp*1000);

      if (expirationDate > new Date()) {
        // El token no ha expirado, así que permite el acceso a la ruta
        console.log("Fecha de expiración del token: " + expirationDate);
        return true;
      } else {
        // Si expiro el token se cierra sesión
        this.loginService.logout();
      }
    }

    // El usuario no está autenticado, redirige a la página de inicio de sesión y rechaza el acceso
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
