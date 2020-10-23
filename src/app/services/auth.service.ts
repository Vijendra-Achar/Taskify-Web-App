import { allUsers, user } from './user-data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  devURL: string = `http://localhost:5000`;
  prodURL: string = `https://taskify-backend-api.herokuapp.com`;

  userAuthState: boolean = false;

  currentUserId: String;
  currentUserEmail: String;
  currentUserName: String;
  currentUserRole: String;

  allEmployees: [{}];

  constructor(private http: HttpClient, private router: Router) {}

  login(cred) {
    return this.http.post(`${this.prodURL}/api/v1/user/loginUser`, cred).pipe(
      tap((data: user) => {
        if (data.token) {
          window.localStorage.setItem('jwt-auth-token', data.token);
          window.localStorage.setItem('userId', data.data.user._id);
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
    return this.http.post(`${this.prodURL}/api/v1/user/signUpNewUser`, cred);
  }

  getAllEmployees() {
    return this.http.get(`${this.prodURL}/api/v1/user/getAllUser`).pipe(
      tap((data: allUsers) => {
        this.allEmployees = data.data.user;
      })
    );
  }

  getOneEmployee(uid) {
    return this.http.get(`${this.prodURL}/api/v1/user/getCurrentUser/${uid}`);
  }

  logOut() {
    window.localStorage.removeItem('jwt-auth-token');
    window.localStorage.removeItem('userId');
    this.userAuthState = false;
    this.router.navigate(['/login']);
  }
}
