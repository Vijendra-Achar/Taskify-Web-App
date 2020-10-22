import { take } from 'rxjs/operators';
import { task, taskNotes } from './../services/task.model';
import { TasksService } from './../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  currentTaskId: string;
  currentTask;

  allNotesForCurrentTask;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((data) => {
      this.currentTaskId = data.taskId;
    });

    this.taskService
      .getOneTaskById(this.currentTaskId)
      .subscribe((data: task) => {
        this.currentTask = data.data.tasks;
      });

    this.taskService
      .getAllNotesForATask(this.currentTaskId)
      .subscribe((data: taskNotes) => {
        this.allNotesForCurrentTask = data.data.taskNotes;
      });
  }

  changeState(state) {
    this.taskService
      .changeTaskState(this.currentTaskId, state)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
