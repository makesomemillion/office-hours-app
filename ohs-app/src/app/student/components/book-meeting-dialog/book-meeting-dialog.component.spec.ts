import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookMeetingDialogComponent} from './book-meeting-dialog.component';
import {MaterialModule} from 'src/app/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PrettifyActivityPipe} from 'src/app/shared/utils/prettify-activity.pipe';
import {PrettifyCreditsPipe} from 'src/app/shared/utils/prettify-credits.pipe';
import {PrettifySemesterPipe} from 'src/app/shared/utils/prettify-semester.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('BookMeetingDialogComponent', () => {
    let component: BookMeetingDialogComponent;
    let fixture: ComponentFixture<BookMeetingDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BookMeetingDialogComponent,
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
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: {}}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookMeetingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
