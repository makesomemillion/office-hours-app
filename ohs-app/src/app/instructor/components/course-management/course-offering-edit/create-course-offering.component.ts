import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourseOfferingModel} from '../../../../shared/models/course-offering.model';


@Component({
    selector: 'ohs-course-offering-edit',
    templateUrl: './course-offering-edit.component.html',
    styleUrls: ['./course-offering-edit.component.scss']
})
export class CreateCourseOfferingComponent implements OnInit {

    courseId: string;
    offering: CourseOfferingModel;

    form: FormGroup;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreateCourseOfferingComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
    ) {
        if (data) {
            this.courseId = data.courseId;
            this.offering = data.offering;
        }
        this.form = this.formBuilder.group({
            year: [this.offering ? this.offering.year : ''],
            semester: [this.offering ? this.offering.semester : ''],
            credits: [this.offering ? this.offering.credits : ''],
        });
    }

    ngOnInit() {
    }

    save() {
        const offering = this.form.value as CourseOfferingModel;
        offering.course = this.courseId;

        if (this.offering == null) {
            this.api.postCourseOffering(offering).subscribe(() => this.dialogRef.close());
        } else {
            offering._id = this.offering._id;
            this.api.updateCourseOffering(offering).subscribe(() => this.dialogRef.close());
        }
    }

    deleteOffering() {
        this.api.deleteCourseOffering(this.courseId, this.offering._id).subscribe(() => this.dialogRef.close());
    }
}
