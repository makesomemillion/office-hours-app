import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuStudentComponent} from './side-menu-student.component';
import {MaterialModule} from 'src/app/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('SideMenuStudentComponent', () => {
    let component: SideMenuStudentComponent;
    let fixture: ComponentFixture<SideMenuStudentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideMenuStudentComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuStudentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
