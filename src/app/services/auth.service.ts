import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(cred) {
    this.http.post('http://localhost:5000/api/v1/user/loginUser', cred);
  }
}
