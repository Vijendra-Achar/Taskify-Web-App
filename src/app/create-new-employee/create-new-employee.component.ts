import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.scss'],
})
export class CreateNewEmployeeComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  errMessage: String;

  isLoading: boolean = false;

  authSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    this.isLoading = true;
    console.log(this.signUpForm.value);
    this.authSub = this.authService.signUp(this.signUpForm.value).subscribe(
      () => {
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      (err) => {
        this.errMessage = err.error.error;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
