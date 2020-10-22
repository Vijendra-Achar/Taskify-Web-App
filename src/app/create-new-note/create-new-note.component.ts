import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-note',
  templateUrl: './create-new-note.component.html',
  styleUrls: ['./create-new-note.component.scss'],
})
export class CreateNewNoteComponent implements OnInit {
  newNoteForm: FormGroup;
  currentTaskId: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.newNoteForm = new FormGroup({
      heading: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
    });

    this.activatedRoute.params.subscribe((data) => {
      this.currentTaskId = data.taskId;
    });
  }

  createNewNote() {
    console.log(this.newNoteForm.value);
  }
}
