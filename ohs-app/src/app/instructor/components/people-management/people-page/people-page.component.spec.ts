import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePageComponent } from './people-page.component';
import { PeopleListingComponent } from '../people-listing/people-listing.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PeoplePageComponent', () => {
    let component: PeoplePageComponent;
    let fixture: ComponentFixture<PeoplePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PeoplePageComponent, PeopleListingComponent],
            imports: [MaterialModule, BrowserAnimationsModule, HttpClientModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PeoplePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
