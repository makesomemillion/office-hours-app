import {Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ApiService} from '../../../shared/services/api.service';
import {BlockModel} from '../../../shared/models/block.model';
import {FormControl} from '@angular/forms';
import {MeetingModel} from '../../../shared/models/meeting.model';
import {AuthService} from '../../../auth/services/auth.service';
import {CommentModel} from '../../../shared/models/comment.model';
import {switchMap} from 'rxjs/operators';
import {CourseSectionModel} from '../../../shared/models/course-section.model';

@Component({
    selector: 'ohs-book-meeting-dialog',
    templateUrl: './book-meeting-dialog.component.html',
    styleUrls: ['./book-meeting-dialog.component.scss']
})
export class BookMeetingDialogComponent implements OnInit {

    slots: Array<{ start: Date, end: Date, duration: number }>;

    formSelectSlot = new FormControl();
    formComment = new FormControl();

    section: CourseSectionModel;

    private blockValue: BlockModel;

    @Input()
    set block(value: BlockModel) {
        this.blockValue = value;
        this.parseBlock();
    }

    get block(): BlockModel {
        return this.blockValue;
    }

    constructor(
        private api: ApiService,
        private auth: AuthService,
        public dialogRef: MatDialogRef<BookMeetingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.block = data.block;
    }

    ngOnInit() {
    }

    parseBlock() {
        const slotsCount = Math.floor(this.block.duration / this.block.meetingDuration);
        this.slots = Array.from(Array(slotsCount).keys())
            .map(i => this.datePlusMinutes(this.block.start, i * this.block.meetingDuration))
            .map(start => ({
                start,
                end: this.datePlusMinutes(start, this.block.meetingDuration),
                duration: this.block.meetingDuration
            }));
        // @ts-ignore
        this.section = this.findCourseSectionWithUser(this.auth.getUserInfo().id, this.block.courseSectionData);
    }

    // noinspection JSMethodCanBeStatic
    datePlusMinutes(date: Date, minutes: number): Date {
        const newDate = new Date(date.getTime());
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return newDate;
    }

    findCourseSectionWithUser(userId: string, courseSections: Array<CourseSectionModel>) {
        return courseSections.find(section => section.studentsIds.includes(userId)
            || section.instructorsIds.includes(userId) || section.teachingAssistantsIds.includes(userId));
    }

    book() {

        const meeting: MeetingModel = {
            _id: null,
            start: this.formSelectSlot.value.start,
            duration: this.formSelectSlot.value.duration,
            isCancelled: false,
            teachingStaff: this.section.instructorsIds.concat(this.section.teachingAssistantsIds),
            students: [this.auth.getUserInfo().id],
            courseSection: this.section._id,
            comments: [],
            notes: [],
        };
        const comment: CommentModel = {
            _id: null,
            author: this.auth.getUserInfo().id,
            timestamp: new Date(Date.now()),
            content: this.formComment.value,
            meeting: null
        };
        this.api
            .postMeeting(meeting)
            .pipe(
                switchMap(m => this.api.postComment(m._id, comment))
            )
            .subscribe(c => this.dialogRef.close(c));
    }
}
