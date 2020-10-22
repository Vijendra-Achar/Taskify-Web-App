import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from './../services/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss'],
})
export class CreateNewTaskComponent implements OnInit {
  taskForm: FormGroup;
  assignableUserId: string;

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

    this.activatedRoute.params.subscribe((data) => {
      this.assignableUserId = data.uid;
    });
  }

  createNewTask() {
    let createdBy = window.localStorage.getItem('userId');
    this.taskService
      .createNewTask(createdBy, this.assignableUserId, this.taskForm.value)
      .subscribe((data) => {
        this.router.navigate(['/', 'emp-tasks-assign', this.assignableUserId]);
      });
  }
}
