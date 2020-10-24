import { AuthService } from './../services/auth.service';
import { TasksService } from './../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { user } from '../services/user-data.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-new-note',
  templateUrl: './create-new-note.component.html',
  styleUrls: ['./create-new-note.component.scss'],
})
export class CreateNewNoteComponent implements OnInit {
  currentUserId: string = window.localStorage.getItem('userId');

  isLoading: boolean = false;

  newNoteForm: FormGroup;
  currentTaskId: string;
  currentUserName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TasksService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newNoteForm = new FormGroup({
      heading: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
    });

    this.authService
      .getOneEmployee(this.currentUserId)
      .pipe(take(1))
      .subscribe((data: user) => {
        this.currentUserName = data.data.user.username;
      });

    this.activatedRoute.params.subscribe((data) => {
      this.currentTaskId = data.taskId;
    });
  }

  get headingValue() {
    return this.newNoteForm.get('heading').value;
  }

  get notesValue() {
    return this.newNoteForm.get('notes').value;
  }

  createNewNote() {
    this.isLoading = true;
    this.taskService
      .createNewTaskNote(
        this.currentTaskId,
        this.headingValue,
        this.notesValue,
        this.currentUserName
      )
      .subscribe(() => {
        this.router.navigate(['/', 'view-task', this.currentTaskId]);
        this.isLoading = false;
      });
  }
}
