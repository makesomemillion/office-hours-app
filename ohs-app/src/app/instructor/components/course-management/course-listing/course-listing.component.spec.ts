import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListingComponent } from './course-listing.component';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseListingComponent', () => {
    let component: CourseListingComponent;
    let fixture: ComponentFixture<CourseListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseListingComponent],
            imports: [MaterialModule, HttpClientModule, BrowserAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
