import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvDialogComponent } from './csv-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PapaParseModule } from 'ngx-papaparse';
import {PrettifySemesterPipe} from '../../../shared/utils/prettify-semester.pipe';
import { PrettifyActivityPipe } from '../../../shared/utils/prettify-activity.pipe';

describe('CsvDialogComponent', () => {
  let component: CsvDialogComponent;
  let fixture: ComponentFixture<CsvDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvDialogComponent, PrettifySemesterPipe, PrettifyActivityPipe ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialFileInputModule,
        PapaParseModule
    ],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
