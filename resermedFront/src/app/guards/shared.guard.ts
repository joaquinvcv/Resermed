import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const tokenDataString = localStorage.getItem('currentUser');
    if(tokenDataString){
      const tokenData = JSON.parse(tokenDataString);
      const userType = tokenData.userType;

      const allowedTokens = ['usuario', 'medico'];

      if (allowedTokens.includes(userType)) {
        return true;
      }

    }
    
    this.router.navigate(['/login']);
    return false;

  }

}