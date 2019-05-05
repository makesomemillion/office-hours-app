import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {MaterialModule} from 'src/app/material.module';
import {SideMenuComponent} from '../../../core/side-menu/side-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CourseGridComponent} from '../course-grid/course-grid.component';
import {MeetingsCalendarComponent} from '../meetings-calendar/meetings-calendar.component';
import {PrettifyActivityPipe} from '../../utils/prettify-activity.pipe';
import {PrettifyCreditsPipe} from '../../utils/prettify-credits.pipe';
import {PrettifySemesterPipe} from '../../utils/prettify-semester.pipe';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {OfficeHourListItemComponent} from '../office-hours-management/office-hour-list-item/office-hour-list-item.component';
import {OfficeHoursManagerComponent} from '../office-hours-management/office-hours-manager/office-hours-manager.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                SideMenuComponent,
                OfficeHoursManagerComponent,
                OfficeHourListItemComponent,
                CourseGridComponent,
                MeetingsCalendarComponent,
                PrettifyActivityPipe,
                PrettifyCreditsPipe,
                PrettifySemesterPipe
            ],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                SchedulerModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
