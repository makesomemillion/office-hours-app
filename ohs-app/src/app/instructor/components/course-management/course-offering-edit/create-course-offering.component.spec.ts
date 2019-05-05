import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseOfferingComponent } from './create-course-offering.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('CreateCourseOfferingComponent', () => {
    let component: CreateCourseOfferingComponent;
    let fixture: ComponentFixture<CreateCourseOfferingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateCourseOfferingComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCourseOfferingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
