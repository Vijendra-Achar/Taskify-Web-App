import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

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
    this.currentUserId = this.authService.currentUserId;
    this.currentUserEmail = this.authService.currentUserEmail;
    this.currentUserName = this.authService.currentUserName;
    this.currentUserRole = this.authService.currentUserRole;

    this.authService.getAllEmployees().subscribe((data) => {
      console.log(data.data.user);
      this.allEmployees = data.data.user;
    });
  }

  logOutNow() {
    this.authService.logOut();
    this.authService.userAuthState;
  }
}
