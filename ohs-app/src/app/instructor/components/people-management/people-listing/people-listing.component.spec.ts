import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListingComponent } from './people-listing.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PeopleListingComponent', () => {
    let component: PeopleListingComponent;
    let fixture: ComponentFixture<PeopleListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PeopleListingComponent],
            imports: [MaterialModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PeopleListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
