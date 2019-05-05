import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotesPageComponent} from './notes-page.component';
import {ViewMeetingComponent} from '../../meeting-management/view-meeting/view-meeting.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {MaterialModule} from '../../../../material.module';
import {PrettifyActivityPipe} from 'src/app/shared/utils/prettify-activity.pipe';
import {PrettifyCreditsPipe} from 'src/app/shared/utils/prettify-credits.pipe';
import {PrettifySemesterPipe} from 'src/app/shared/utils/prettify-semester.pipe';
import {RouterTestingModule} from '@angular/router/testing';

describe('NotesPageComponent', () => {
    let component: NotesPageComponent;
    let fixture: ComponentFixture<NotesPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NotesPageComponent,
                ViewMeetingComponent,
                PrettifyActivityPipe,
                PrettifyCreditsPipe,
                PrettifySemesterPipe
            ],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
