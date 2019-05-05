import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentService} from './services/student.service';
import {StudentRoutingModule} from './student-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BookMeetingDialogComponent} from './components/book-meeting-dialog/book-meeting-dialog.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        BookMeetingDialogComponent,
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        StudentService,
    ],
    entryComponents: [
        BookMeetingDialogComponent,
    ]
})
export class StudentModule {
}
