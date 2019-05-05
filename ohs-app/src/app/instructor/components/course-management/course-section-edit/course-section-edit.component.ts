import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourseSectionModel} from '../../../../shared/models/course-section.model';

@Component({
    selector: 'ohs-course-section-edit',
    templateUrl: './course-section-edit.component.html',
    styleUrls: ['./course-section-edit.component.scss']
})
export class CourseSectionEditComponent implements OnInit {

    courseId: string;
    offeringId: string;
    section: CourseSectionModel;

    form: FormGroup;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CourseSectionEditComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
    ) {
        if (data) {
            this.courseId = data.courseId;
            this.offeringId = data.offeringId;
            this.section = data.section;
        }
        this.form = this.formBuilder.group({
            activity: [this.section ? this.section.activity : ''],
            number: [this.section ? this.section.number : ''],
        });
    }

    ngOnInit() {
    }

    save() {
        const section = this.form.value as CourseSectionModel;
        section.courseOffering = this.offeringId;

        if (this.section == null) {
            this.api.postCourseSection(this.courseId, section).subscribe(() => this.dialogRef.close());
        } else {
            section._id = this.section._id;
            this.api.updateCourseSection(this.courseId, section).subscribe(() => this.dialogRef.close());
        }
    }

    deleteSection() {
        this.api.deleteCourseSection(this.courseId, this.offeringId, this.section._id).subscribe(() => this.dialogRef.close());
    }

}
