import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageComponent } from './course-page.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseOfferingListingComponent } from '../course-offering-listing/course-offering-listing.component';
import { PrettifySemesterPipe } from 'src/app/shared/utils/prettify-semester.pipe';
import { PrettifyCreditsPipe } from 'src/app/shared/utils/prettify-credits.pipe';

describe('CoursePageComponent', () => {
    let component: CoursePageComponent;
    let fixture: ComponentFixture<CoursePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CoursePageComponent,
                CourseOfferingListingComponent,
                PrettifySemesterPipe,
                PrettifyCreditsPipe
            ],
            imports: [MaterialModule, BrowserAnimationsModule, HttpClientModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
