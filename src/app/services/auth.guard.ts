import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (
      !window.localStorage.getItem('jwt-auth-token') ||
      !window.localStorage.getItem('userId')
    ) {
      this.router.navigate(['/', 'login']);
      return false;
    }
    return true;
  }
}
