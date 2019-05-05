import { Component, Inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {NoteModel} from '../../../../shared/models/note.model';

@Component({
  selector: 'ohs-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note: NoteModel;
  @Input() meetingId: string;

  form: FormGroup;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    if (data) {
      this.note = data.note;
      this.meetingId = data.meetingId;
    }

    const firstName = this.auth.getUserInfo() && this.auth.getUserInfo().firstName;
    const lastName = this.auth.getUserInfo() && this.auth.getUserInfo().lastName;


    this.form = this.formBuilder.group({
      author: [this.note ? this.note.author : firstName + ' ' + lastName],
      timestamp: [this.note ? this.note.timestamp : new Date()],
      meeting: [this.note ? this.note.meeting : this.meetingId],
      content: [this.note ? this.note.content : '']
    });

    // this.reload();
  }

  ngOnInit() {
    // this.api.getPerson(this.auth.getUserInfo().id)
    //     .subscribe(
    //       data => {
    //         this.author = data.firstName;
    //         console.log(this.author);
    //         console.log(data);
    //       },
    //     );
  }

  // reload() {
  //   this.api.getPerson(this.auth.getUserInfo().id)
  //   .subscribe(
  //     data => {
  //       this.author = data.firstName;
  //       console.log(data);
  //       // console.log(data);
  //     },
  //   );
  // }

  save() {
    const note = this.form.value as NoteModel;

    if (this.note != null) {
      note._id = this.note._id;
      this.api.updateNote(note).subscribe(() => this.dialogRef.close(note));
    } else {
      this.api.postNote(this.meetingId, note).subscribe(() => this.dialogRef.close(note));
    }
  }

  deleteNote() {
    this.api.deleteNote(this.note._id).subscribe(() => this.dialogRef.close());
  }

}
