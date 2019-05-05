import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseGridComponent} from './components/course-grid/course-grid.component';
import {MeetingsCalendarComponent} from './components/meetings-calendar/meetings-calendar.component';
import {SideMenuStudentComponent} from './components/side-menu-student/side-menu-student.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PrettifySemesterPipe} from './utils/prettify-semester.pipe';
import {PrettifyCreditsPipe} from './utils/prettify-credits.pipe';
import {PrettifyActivityPipe} from './utils/prettify-activity.pipe';
import {MaterialModule} from '../material.module';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OfficeHourDialogComponent} from '../instructor/components/office-hour-dialog/office-hour-dialog.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CommentsPageComponent} from './components/comments-management/comments-page/comments-page.component';
import {BlockPageComponent} from './components/meeting-management/block-page/block-page.component';
import {MeetingItemComponent} from './components/meeting-management/meeting-item/meeting-item.component';
import {ViewMeetingComponent} from './components/meeting-management/view-meeting/view-meeting.component';
import {OfficeHoursManagerComponent} from './components/office-hours-management/office-hours-manager/office-hours-manager.component';
import {OfficeHourListItemComponent} from './components/office-hours-management/office-hour-list-item/office-hour-list-item.component';
import {NotesPageComponent} from './components/notes-management/notes-page/notes-page.component';
import {CommentComponent} from "./components/comments-management/comment/comment.component";
import {NoteComponent} from "./components/notes-management/note/note.component";
import { CsvDialogComponent } from '../instructor/components/csv-dialog/csv-dialog.component'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
    declarations: [
        CourseGridComponent,
        MeetingsCalendarComponent,
        SideMenuStudentComponent,
        DashboardComponent,
        PrettifySemesterPipe,
        PrettifyCreditsPipe,
        PrettifyActivityPipe,
        OfficeHourDialogComponent,
        CommentsPageComponent,
        BlockPageComponent,
        MeetingItemComponent,
        ViewMeetingComponent,
        OfficeHoursManagerComponent,
        OfficeHourListItemComponent,
        NotesPageComponent,
        CommentComponent,
        NoteComponent,
        CsvDialogComponent,
    ],
    exports: [
        CourseGridComponent,
        DashboardComponent,
        CourseGridComponent,
        MeetingsCalendarComponent,
        PrettifySemesterPipe,
        PrettifyCreditsPipe,
        PrettifyActivityPipe,
        NgxMaterialTimepickerModule,
        OfficeHourDialogComponent,
        CommentsPageComponent,
        BlockPageComponent,
        MeetingItemComponent,
        ViewMeetingComponent,
        OfficeHoursManagerComponent,
        OfficeHourListItemComponent,
        NotesPageComponent,
        CommentComponent,
        NoteComponent,
        CsvDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SchedulerModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaterialTimepickerModule,
        MaterialFileInputModule,
        PapaParseModule,
    ],
    entryComponents: [
        OfficeHourDialogComponent,
        CommentComponent,
        NoteComponent,
        CsvDialogComponent,
    ]
})
export class SharedModule {
}
