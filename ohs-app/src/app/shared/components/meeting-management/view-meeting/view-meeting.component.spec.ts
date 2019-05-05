import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewMeetingComponent} from './view-meeting.component';
import {MaterialModule} from 'src/app/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotesPageComponent} from '../../notes-management/notes-page/notes-page.component';
import {PrettifyActivityPipe} from 'src/app/shared/utils/prettify-activity.pipe';
import {PrettifyCreditsPipe} from 'src/app/shared/utils/prettify-credits.pipe';
import {PrettifySemesterPipe} from 'src/app/shared/utils/prettify-semester.pipe';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('ViewMeetingComponent', () => {
    let component: ViewMeetingComponent;
    let fixture: ComponentFixture<ViewMeetingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ViewMeetingComponent,
                NotesPageComponent,
                PrettifyActivityPipe,
                PrettifyCreditsPipe,
                PrettifySemesterPipe
            ],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewMeetingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
