import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MeetingItemComponent} from './meeting-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../../material.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('MeetingItemComponent', () => {
    let component: MeetingItemComponent;
    let fixture: ComponentFixture<MeetingItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MeetingItemComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeetingItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
