import { TasksService } from './../services/tasks.service';
import { user } from './../services/user-data.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;

  currentUserId: String;
  currentUserEmail: String;
  currentUserName: String;
  currentUserRole: String;

  currentEmployeeTasks;

  allEmployees;

  taskSub: Subscription;

  authEmp: Subscription;
  authMan: Subscription;

  constructor(
    private authService: AuthService,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.currentUserId = window.localStorage.getItem('userId');
    this.currentUserEmail = this.authService.currentUserEmail;

    this.authEmp = this.authService
      .getOneEmployee(this.currentUserId)
      .pipe(take(1))
      .subscribe((data: user) => {
        this.currentUserName = data.data.user.username;
        this.currentUserRole = data.data.user.role;
      });

    this.authMan = this.authService.getAllEmployees().subscribe((data) => {
      this.allEmployees = data.data.user;
      this.isLoading = false;
    });

    this.taskSub = this.taskService
      .getTasksAssignedToEmployee(this.currentUserId)
      .subscribe((data) => {
        this.currentEmployeeTasks = data.data.tasks;
        this.isLoading = false;
      });
  }

  logOutNow() {
    this.authService.logOut();
    this.authService.userAuthState;
  }

  ngOnDestroy() {
    this.authEmp.unsubscribe();
    this.authMan.unsubscribe();
    this.taskSub.unsubscribe();
  }
}
