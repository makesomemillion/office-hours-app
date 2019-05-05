import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrettifySemesterPipe } from 'src/app/shared/utils/prettify-semester.pipe';
import { PrettifyCreditsPipe } from 'src/app/shared/utils/prettify-credits.pipe';

describe('CreateCourseComponent', () => {
    let component: CreateCourseComponent;
    let fixture: ComponentFixture<CreateCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateCourseComponent, PrettifySemesterPipe, PrettifyCreditsPipe],
            imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
