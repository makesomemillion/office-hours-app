import {Component, Inject, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourseModel} from '../../../../shared/models/course.model';


@Component({
    selector: 'ohs-course-edit',
    templateUrl: './course-edit.component.html',
    styleUrls: ['./course-edit.component.scss']
})
export class CreateCourseComponent implements OnInit {

    @Input() course: CourseModel;

    form: FormGroup;

    constructor(
        private api: ApiService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreateCourseComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
    ) {
        if (data) {
            this.course = data.course;
        }
        this.form = this.formBuilder.group({
            departmentCode: [this.course ? this.course.departmentCode : ''],
            number: [this.course ? this.course.number : ''],
            name: [this.course ? this.course.name : '']
        });
    }

    ngOnInit() {
    }

    save() {
        const course = this.form.value as CourseModel;

        if (this.course == null) {
            this.api.postCourse(course).subscribe(() => this.dialogRef.close(course));
        } else {
            course._id = this.course._id;
            this.api.updateCourse(course).subscribe(() => this.dialogRef.close(course));
        }
    }

    deleteCourse() {
        this.api.deleteCourse(this.course._id).subscribe(() => this.dialogRef.close());
    }
}
