import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHourDialogComponent } from './office-hour-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';
import { PrettifySemesterPipe } from '../../../shared/utils/prettify-semester.pipe';
import { PrettifyActivityPipe } from '../../../shared/utils/prettify-activity.pipe';

describe('OfficeHourDialogComponent', () => {
    let component: OfficeHourDialogComponent;
    let fixture: ComponentFixture<OfficeHourDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OfficeHourDialogComponent, PrettifySemesterPipe, PrettifyActivityPipe],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                NgxMaterialTimepickerModule,
                HttpClientModule
            ],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfficeHourDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
