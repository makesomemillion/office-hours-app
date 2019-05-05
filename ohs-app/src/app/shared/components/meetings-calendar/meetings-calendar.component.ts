import {Component, Input, OnInit} from '@angular/core';
import {Resource, SchedulerEvent} from '@progress/kendo-angular-scheduler';
import {MeetingModel} from '../../models/meeting.model';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../../auth/services/auth.service';
import {map, tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {BlockModel} from '../../models/block.model';
import {CourseSectionModel} from '../../models/course-section.model';
import {MatDialog} from '@angular/material';
import {BookMeetingDialogComponent} from '../../../student/components/book-meeting-dialog/book-meeting-dialog.component';
import {StateService} from '../../services/state.service';
import {Router} from '@angular/router';

@Component({
    selector: 'ohs-meetings-calendar',
    templateUrl: './meetings-calendar.component.html',
    styleUrls: ['./meetings-calendar.component.scss']
})
export class MeetingsCalendarComponent implements OnInit {

    // @ts-ignore
    private _filterSections: Array<CourseSectionModel>;

    @Input()
    set filterSections(value: Array<CourseSectionModel>) {
        this._filterSections = value;
        this.reloadData();
    }

    get filterSections() {
        return this._filterSections;
    }

    constructor(
        private api: ApiService,
        private auth: AuthService,
        private state: StateService,
        private dialog: MatDialog,
        private router: Router,
    ) {
    }

    public events: SchedulerEvent[] = [];
    public resources: Resource[] = [{
        name: 'Type',
        data: [
            {text: 'Office Hour Blocks', value: 'block', color: '#6eb3fa'},
            {text: 'Meetings', value: 'meeting', color: '#f58a8a'}
        ],
        field: 'type',
        valueField: 'value',
        textField: 'text',
        colorField: 'color'
    }];

    static meetingToSchedulerEvent(meeting: MeetingModel): SchedulerEvent {
        const endTime = new Date(meeting.start.getTime());
        endTime.setMinutes(meeting.start.getMinutes() + meeting.duration);
        return {
            // @ts-ignore
            title: `${meeting.courseData.departmentCode}${meeting.courseData.number}`,
            start: meeting.start,
            end: endTime,
            id: meeting._id,
            dataItem: meeting,
            // @ts-ignore
            type: 'meeting',
        };
    }

    static blockToSchedulerEvent(block: BlockModel): SchedulerEvent {
        const endTime = new Date(block.start.getTime());
        endTime.setMinutes(block.start.getMinutes() + block.duration);
        return {
            // @ts-ignore
            title: block.courseData.map(course => `${course.departmentCode}${course.number}`).join(', '),
            start: block.start,
            end: endTime,
            id: block._id,
            dataItem: block,
            // @ts-ignore
            type: 'block',
            // @ts-ignore
            sections: block.courseSectionData.map(section => `LEC${section.number}`).join(', ')
        };
    }

    ngOnInit() {
        this.reloadData();
    }

    public reloadData() {
        const id = this.auth.getUserInfo() && this.auth.getUserInfo().id;

        forkJoin(
            this.api.getMeetingsForPerson(id),
            this.api.getBlocksForPerson(id),
        ).pipe(
            map(([meetings, blocks]): [Array<MeetingModel>, Array<BlockModel>] => [
                meetings.filter(meeting => this.showCourseSection(meeting.courseSection)),
                blocks.filter(block => this.showCourseSection(...block.courseSections))]),
            map(([meetings, blocks]) => [
                meetings.map(MeetingsCalendarComponent.meetingToSchedulerEvent),
                blocks.map(MeetingsCalendarComponent.blockToSchedulerEvent)]),
            map(([meetings, blocks]) => meetings.concat(blocks)),
            tap(events => console.log(events)),
        ).subscribe(events => this.events = events);

    }

    showCourseSection(...courseSection: Array<string>) {
        if (!this.filterSections || this.filterSections.length === 0) {
            return true;
        } else {
            const filteredSections = this.filterSections.map(section => section._id);
            return courseSection.some(section => filteredSections.includes(section));
        }
    }

    eventClick(type: string, dataItem: any) {
        if (type === 'block' && this.state.isStudent()) {
            this.dialog.open(BookMeetingDialogComponent, {
                width: '600px',
                data: {block: dataItem}
            }).afterClosed().subscribe(() => this.reloadData());
        } else if (type === 'meeting' && this.state.isStudent()) {
            this.router.navigate(['student', 'meetings', dataItem._id]).catch(err => console.log(err));
        }else if (type === 'meeting' && this.state.isInstructor()) {
            this.router.navigate(['instructor', 'meetings', dataItem._id]).catch(err => console.log(err));
        }
    }
}
