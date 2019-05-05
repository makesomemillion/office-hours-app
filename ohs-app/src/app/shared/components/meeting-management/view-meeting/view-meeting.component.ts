import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../../auth/services/auth.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {MeetingModel} from '../../../models/meeting.model';
import {StateService} from '../../../services/state.service';
import {PersonModel} from '../../../models/person.model';
import {NoteModel} from '../../../models/note.model';
import {CommentModel} from "../../../models/comment.model";

@Component({
    selector: 'ohs-view-meeting',
    templateUrl: './view-meeting.component.html',
    styleUrls: ['./view-meeting.component.scss']
})
export class ViewMeetingComponent implements OnInit {

    meeting: MeetingModel;

    form: FormGroup;

    students: string;

    teachingStaff: string;

    formComment = new FormControl();

    formNote = new FormControl();

    constructor(
        private api: ApiService,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private state: StateService,
    ) {
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.route.params
            .pipe(
                map(params => params.meetingId),
                switchMap(meetingId => this.api.getMeeting(meetingId)),
                tap(meeting => meeting == null ? this.router.navigate(['/instructor/meetings']) : null)
            )
            .subscribe(meeting => this.parseMeeting(meeting));
    }

    parseMeeting(meeting: MeetingModel) {
        this.meeting = meeting;
        // @ts-ignore
        this.students = this.meeting.studentsData
            .map((p: PersonModel) => `${p.firstName} ${p.lastName}`)
            .join(', ');
        // @ts-ignore
        this.teachingStaff = this.meeting.teachingStaffData
            .map((p: PersonModel) => `${p.firstName} ${p.lastName}`)
            .join(', ');
    }

    // noinspection JSMethodCanBeStatic
    datePlusMins(date: Date, minutes: number): Date {
        if (!date || !minutes) {
            return null;
        }
        const newDate = new Date(date.getTime());
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return newDate;
    }

    reloadNotes() {
        this.api.getNotesForMeeting(this.meeting._id)
        // @ts-ignore
            .subscribe(notes => this.meeting.notesData = notes);
    }

    reloadComments() {
        this.api.getCommentsForMeeting(this.meeting._id)
        // @ts-ignore
            .subscribe(comments => this.meeting.commentsData = comments);
    }

    submitNote() {
        const note: NoteModel = {
            _id: null,
            author: this.auth.getUserInfo().id,
            content: this.formNote.value,
            meeting: this.meeting._id,
            timestamp: null
        };
        this.formNote.reset();
        this.api.postNote(this.meeting._id, note)
            .subscribe(() => this.reloadNotes());
    }

    submitComment() {
        const comment: CommentModel = {
            _id: null,
            author: this.auth.getUserInfo().id,
            content: this.formComment.value,
            meeting: this.meeting._id,
            timestamp: null
        };
        this.formComment.reset();
        this.api.postComment(this.meeting._id, comment)
            .subscribe(() => this.reloadComments());
    }

    getAuthor(thing: CommentModel | NoteModel): PersonModel {
        // @ts-ignore
        const authors: Array<PersonModel> = this.meeting.teachingStaffData.concat(this.meeting.studentsData);
        return authors.find(author => author._id === thing.author);
    }

    deleteComment(comment: CommentModel) {
        this.api.deleteComment(comment._id).subscribe(() => this.reloadComments());
    }

    deleteNote(note: NoteModel) {
        this.api.deleteNote(note._id).subscribe(() => this.reloadNotes());
    }

    deleteMeeting() {
        this.api.deleteMeeting(this.meeting._id).subscribe(() => window.location.reload());
    }
}
