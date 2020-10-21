import { task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  currentEmployeeTasks: [{}];

  constructor(private http: HttpClient) {}

  getTasksAssignedToEmployee(uid: String) {
    return this.http
      .get(`http://localhost:5000/api/v1/task/getMyTasks/${uid}`)
      .pipe(
        tap((data: task) => {
          this.currentEmployeeTasks = data.data.tasks;
        })
      );
  }
}
