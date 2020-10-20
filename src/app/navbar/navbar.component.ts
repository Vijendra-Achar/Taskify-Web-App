import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: String;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserName;
  }
}
