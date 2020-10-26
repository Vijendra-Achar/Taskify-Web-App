import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from './../services/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss'],
})
export class CreateNewTaskComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  assignableUserId: string;

  taskSub: Subscription;

  constructor(
    private taskService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
    });

    this.activatedRoute.params.pipe(take(1)).subscribe((data) => {
      this.assignableUserId = data.uid;
    });
  }

  createNewTask() {
    let taskFormValueObj = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      deadline: this.taskForm.get('deadline').value,
    };

    let createdBy = window.localStorage.getItem('userId');
    this.taskSub = this.taskService
      .createNewTask(createdBy, this.assignableUserId, taskFormValueObj)
      .subscribe((data) => {
        this.router.navigate(['/', 'emp-tasks-assign', this.assignableUserId]);
      });
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }
}
