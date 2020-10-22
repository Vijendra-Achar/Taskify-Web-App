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

  createNewTask(createdBy: string, assignedTo: string, taskData: object) {
    return this.http.post(
      `http://localhost:5000/api/v1/task/createTask/${createdBy}/${assignedTo}`,
      taskData
    );
  }

  getOneTaskById(taskid) {
    return this.http.get(
      `http://localhost:5000/api/v1/task/getOneTaskById/${taskid}`
    );
  }

  getAllNotesForATask(taskId) {
    return this.http.get(
      `http://localhost:5000/api/v1/taskNotes/allTaskNotes/${taskId}`
    );
  }

  createNewTaskNote(taskId, notesheading, notesDesc, writtenBy) {
    const databody = {
      heading: notesheading,
      notes: notesDesc,
      writtenBy: writtenBy,
    };

    return this.http.post(
      `http://localhost:5000/api/v1/taskNotes/createNewNote/${taskId}`,
      databody
    );
  }

  changeTaskState(taskId, state) {
    return this.http.patch(
      `http://localhost:5000/api/v1/task/changeTaskStatus/${taskId}`,
      {
        completed: state,
      }
    );
  }
}
