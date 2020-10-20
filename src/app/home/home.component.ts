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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.currentUserId;
    this.currentUserEmail = this.authService.currentUserEmail;
    this.currentUserName = this.authService.currentUserName;
    this.currentUserRole = this.authService.currentUserRole;
  }

  logOutNow() {
    this.authService.logOut();
    this.authService.userAuthState;
  }
}
