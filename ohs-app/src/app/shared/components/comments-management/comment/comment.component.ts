import { Component, Inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommentModel } from 'src/app/shared/models/comment.model';

@Component({
  selector: 'ohs-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentModel;
  @Input() meetingId: string;

  form: FormGroup;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    if (data) {
      this.comment = data.comment;
      this.meetingId = data.meetingId;
    }

    const firstName = this.auth.getUserInfo() && this.auth.getUserInfo().firstName;
    const lastName = this.auth.getUserInfo() && this.auth.getUserInfo().lastName;

    this.form = this.formBuilder.group({
      author: [this.comment ? this.comment.author : firstName + ' ' + lastName],
      timestamp: [this.comment ? this.comment.timestamp : new Date()],
      meeting: [this.comment ? this.comment.meeting : '1'],
      content: [this.comment ? this.comment.content : '']
    });
  }

  ngOnInit() {
  }

  save() {
    const comment = this.form.value as CommentModel;
    console.log(comment);

    if (this.comment != null) {
      comment._id = this.comment._id;
      this.api.updateComment(comment).subscribe(() => this.dialogRef.close(comment));
    } else {
      this.api.postComment(this.meetingId, comment).subscribe(() => this.dialogRef.close(comment));
    }
  }

  deleteComment() {
    this.api.deleteComment(this.comment._id).subscribe(() => this.dialogRef.close());
  }

}
