import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionListingComponent } from './course-section-listing.component';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrettifyActivityPipe } from 'src/app/shared/utils/prettify-activity.pipe';

describe('CourseSectionListingComponent', () => {
    let component: CourseSectionListingComponent;
    let fixture: ComponentFixture<CourseSectionListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseSectionListingComponent, PrettifyActivityPipe],
            imports: [MaterialModule, HttpClientModule, BrowserAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseSectionListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
