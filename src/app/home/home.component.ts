import { user } from './../services/user-data.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUserId: String;
  currentUserEmail: String;
  currentUserName: String;
  currentUserRole: String;

  allEmployees;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserId = window.localStorage.getItem('userId');
    this.currentUserEmail = this.authService.currentUserEmail;
    this.currentUserRole = this.authService.currentUserRole;

    this.authService
      .getOneEmployee(this.currentUserId)
      .pipe(take(1))
      .subscribe((data: user) => {
        this.currentUserName = data.data.user.username;
      });

    this.authService.getAllEmployees().subscribe((data) => {
      this.allEmployees = data.data.user;
    });
  }

  logOutNow() {
    this.authService.logOut();
    this.authService.userAuthState;
  }
}
