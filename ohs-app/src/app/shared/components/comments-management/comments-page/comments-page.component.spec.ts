import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentsPageComponent} from './comments-page.component';
import {MaterialModule} from 'src/app/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('CommentsPageComponent', () => {
    let component: CommentsPageComponent;
    let fixture: ComponentFixture<CommentsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommentsPageComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
