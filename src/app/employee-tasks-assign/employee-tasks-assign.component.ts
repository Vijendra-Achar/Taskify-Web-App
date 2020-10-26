import { take } from 'rxjs/operators';
import { user } from './../services/user-data.model';
import { TasksService } from './../services/tasks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-tasks-assign',
  templateUrl: './employee-tasks-assign.component.html',
  styleUrls: ['./employee-tasks-assign.component.scss'],
})
export class EmployeeTasksAssignComponent implements OnInit, OnDestroy {
  currentEmployeeTasks;
  selectedEmployeeId: String;
  selectedEmployeeName: String;

  isLoading: boolean = false;

  authSub: Subscription;
  taskSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TasksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.pipe(take(1)).subscribe((value) => {
      this.selectedEmployeeId = value.uid;
    });

    this.taskSub = this.taskService
      .getTasksAssignedToEmployee(this.selectedEmployeeId)
      .subscribe((data) => {
        this.currentEmployeeTasks = data.data.tasks;
        this.isLoading = false;
      });

    this.authSub = this.authService
      .getOneEmployee(this.selectedEmployeeId)
      .subscribe((data: user) => {
        this.selectedEmployeeName = data.data.user.username;
      });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.taskSub.unsubscribe();
  }
}
