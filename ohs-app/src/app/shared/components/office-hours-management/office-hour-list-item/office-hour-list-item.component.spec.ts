import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHourListItemComponent } from './office-hour-list-item.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BlockPageComponent } from '../../meeting-management/block-page/block-page.component';
import { MeetingItemComponent } from '../../meeting-management/meeting-item/meeting-item.component';
import { OfficeHoursManagerComponent } from '../office-hours-manager/office-hours-manager.component';

describe('OfficeHourListItemComponent', () => {
    let component: OfficeHourListItemComponent;
    let fixture: ComponentFixture<OfficeHourListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OfficeHourListItemComponent,
                BlockPageComponent,
                OfficeHoursManagerComponent,
                MeetingItemComponent
            ],
            imports: [MaterialModule, BrowserAnimationsModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfficeHourListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
