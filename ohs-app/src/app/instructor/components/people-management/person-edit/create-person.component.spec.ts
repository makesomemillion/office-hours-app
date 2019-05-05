import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonComponent } from './create-person.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('CreatePersonComponent', () => {
    let component: CreatePersonComponent;
    let fixture: ComponentFixture<CreatePersonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreatePersonComponent],
            imports: [MaterialModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule],
            providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreatePersonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
