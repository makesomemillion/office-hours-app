import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOfferingListingComponent } from './course-offering-listing.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrettifySemesterPipe } from 'src/app/shared/utils/prettify-semester.pipe';
import { PrettifyCreditsPipe } from 'src/app/shared/utils/prettify-credits.pipe';
import { HttpClientModule } from '@angular/common/http';

describe('CourseOfferingListingComponent', () => {
    let component: CourseOfferingListingComponent;
    let fixture: ComponentFixture<CourseOfferingListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseOfferingListingComponent, PrettifySemesterPipe, PrettifyCreditsPipe],
            imports: [MaterialModule, BrowserAnimationsModule, HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseOfferingListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
