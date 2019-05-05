import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSectionEditComponent } from './course-section-edit.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('CourseSectionEditComponent', () => {
    let component: CourseSectionEditComponent;
    let fixture: ComponentFixture<CourseSectionEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseSectionEditComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientModule
            ],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseSectionEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
