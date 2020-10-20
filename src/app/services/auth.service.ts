import { user } from './user-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userAuthState: boolean = false;

  currentUserId: String;
  currentUserEmail: String;
  currentUserName: String;
  currentUserRole: String;

  constructor(private http: HttpClient, private router: Router) {}

  login(cred) {
    return this.http
      .post('http://localhost:5000/api/v1/user/loginUser', cred)
      .pipe(
        tap((data: user) => {
          if (data.token) {
            window.localStorage.setItem('jwt-auth-token', data.token);
            this.userAuthState = true;
            this.currentUserId = data.data.user._id;
            this.currentUserEmail = data.data.user.email;
            this.currentUserName = data.data.user.username;
            this.currentUserRole = data.data.user.role;
          }
        })
      );
  }

  signUp(cred) {
    return this.http.post(
      'http://localhost:5000/api/v1/user/signUpNewUser',
      cred
    );
  }

  logOut() {
    window.localStorage.removeItem('jwt-auth-token');
    this.userAuthState = false;
    this.router.navigate(['/login']);
  }
}
