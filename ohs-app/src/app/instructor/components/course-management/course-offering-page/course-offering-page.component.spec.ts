import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOfferingPageComponent } from './course-offering-page.component';
import { PrettifySemesterPipe } from 'src/app/shared/utils/prettify-semester.pipe';
import { PrettifyCreditsPipe } from 'src/app/shared/utils/prettify-credits.pipe';
import { CourseSectionListingComponent } from '../course-section-listing/course-section-listing.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrettifyActivityPipe } from 'src/app/shared/utils/prettify-activity.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CourseOfferingPageComponent', () => {
    let component: CourseOfferingPageComponent;
    let fixture: ComponentFixture<CourseOfferingPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CourseOfferingPageComponent,
                CourseSectionListingComponent,
                PrettifySemesterPipe,
                PrettifyCreditsPipe,
                PrettifyActivityPipe
            ],
            imports: [MaterialModule, BrowserAnimationsModule, HttpClientModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseOfferingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
