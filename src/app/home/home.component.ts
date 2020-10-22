import { TasksService } from './../services/tasks.service';
import { user } from './../services/user-data.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  currentEmployeeTasks;

  allEmployees;

  taskSub: Subscription;

  constructor(
    private authService: AuthService,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.currentUserId = window.localStorage.getItem('userId');
    this.currentUserEmail = this.authService.currentUserEmail;

    this.authService
      .getOneEmployee(this.currentUserId)
      .pipe(take(1))
      .subscribe((data: user) => {
        this.currentUserName = data.data.user.username;
        this.currentUserRole = data.data.user.role;
      });

    this.authService.getAllEmployees().subscribe((data) => {
      this.allEmployees = data.data.user;
    });

    this.taskSub = this.taskService
      .getTasksAssignedToEmployee(this.currentUserId)
      .subscribe((data) => {
        this.currentEmployeeTasks = data.data.tasks;
      });
  }

  logOutNow() {
    this.authService.logOut();
    this.authService.userAuthState;
  }
}
