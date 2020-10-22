import { TasksService } from './../services/tasks.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { user } from '../services/user-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.scss'],
})
export class HomeEmployeeComponent implements OnInit {
  currentUserId: String;
  currentUserEmail: String;
  currentUserName: String;
  currentUserRole: String;

  taskSub: Subscription;

  currentEmployeeTasks;

  constructor(
    private authService: AuthService,
    private taskService: TasksService
  ) {}

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

    this.taskSub = this.taskService
      .getTasksAssignedToEmployee(this.currentUserId)
      .subscribe((data) => {
        this.currentEmployeeTasks = data.data.tasks;
        console.log(this.currentEmployeeTasks);
      });
  }

  logOutNow() {
    this.authService.logOut();
    this.authService.userAuthState;
  }
}
