import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPageComponent } from './block-page.component';
import { OfficeHourListItemComponent } from '../../office-hours-management/office-hour-list-item/office-hour-list-item.component';
import { MeetingItemComponent } from '../meeting-item/meeting-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('BlockPageComponent', () => {
    let component: BlockPageComponent;
    let fixture: ComponentFixture<BlockPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BlockPageComponent, OfficeHourListItemComponent, MeetingItemComponent],
            imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule, HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlockPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
