import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MeetingsCalendarComponent} from './meetings-calendar.component';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from 'src/app/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MeetingsCalendarComponent', () => {
    let component: MeetingsCalendarComponent;
    let fixture: ComponentFixture<MeetingsCalendarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MeetingsCalendarComponent],
            imports: [
                SchedulerModule,
                HttpClientModule,
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeetingsCalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
