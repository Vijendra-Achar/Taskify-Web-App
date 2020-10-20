import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../services/user-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    console.log(this.authService.userAuthState);
  }

  submitLoginForm() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (data: user) => {
        console.log(data);
        console.log(this.authService.currentUserId);
        console.log(this.authService.userAuthState);
        if (data.role === 'employee') {
          this.router.navigate(['/', 'home-emp']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
        console.log(error.error.message);
      }
    );
  }
}
