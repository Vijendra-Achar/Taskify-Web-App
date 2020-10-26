import { take } from 'rxjs/operators';
import { task, taskNotes } from './../services/task.model';
import { TasksService } from './../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  taskStage;

  errMessage: string;

  currentTaskId: string;
  currentTaskPercentage: number;
  currentTask;

  currentUserId;
  allNotesForCurrentTask;

  taskSub: Subscription;
  taskSubId: Subscription;
  taskSubPer: Subscription;
  taskSubState: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.activatedRoute.params.pipe(take(1)).subscribe((data) => {
      this.currentTaskId = data.taskId;
    });

    this.taskSub = this.taskService
      .getOneTaskById(this.currentTaskId)
      .subscribe((data: task) => {
        this.currentTask = data.data.tasks;
        this.currentTaskPercentage = this.currentTask.percentageOfCompletion;
        this.currentUserId = this.currentTask.assignedTo._id;
        this.isLoading = false;
      });

    this.taskSubId = this.taskService
      .getAllNotesForATask(this.currentTaskId)
      .subscribe((data: taskNotes) => {
        this.allNotesForCurrentTask = data.data.taskNotes;
      });
  }

  updatetaskProgress(value) {
    this.taskSubPer = this.taskService
      .updatetaskPercentage(value, this.currentTaskId)
      .subscribe(
        (data) => {
          this.currentTaskPercentage = value;
          this.errMessage = '';
          console.log(data);
        },
        (error) => {
          this.errMessage = error.error.message;
        }
      );
  }

  changeState(state) {
    if (state == true) {
      this.updatetaskProgress(100);
    } else if (state == false) {
      this.updatetaskProgress(0);
    }
    this.isLoading = true;
    this.taskSubState = this.taskService
      .changeTaskState(this.currentTaskId, state)
      .subscribe(() => {
        this.router.navigate(['/', 'emp-tasks-assign', this.currentUserId]);
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
    this.taskSubId.unsubscribe();
    this.taskSubPer.unsubscribe();
    this.taskSubState.unsubscribe();
  }
}
