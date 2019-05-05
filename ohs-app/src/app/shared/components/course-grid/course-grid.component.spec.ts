import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseGridComponent} from './course-grid.component';
import {MaterialModule} from 'src/app/material.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PrettifySemesterPipe} from '../../utils/prettify-semester.pipe';
import {PrettifyActivityPipe} from '../../utils/prettify-activity.pipe';
import {PrettifyCreditsPipe} from '../../utils/prettify-credits.pipe';

describe('CourseGridComponent', () => {
    let component: CourseGridComponent;
    let fixture: ComponentFixture<CourseGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CourseGridComponent,
                PrettifySemesterPipe,
                PrettifyActivityPipe,
                PrettifyCreditsPipe
            ],
            imports: [
                MaterialModule,
                HttpClientModule,
                RouterTestingModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
