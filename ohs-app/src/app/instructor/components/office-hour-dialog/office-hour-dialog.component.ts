import {Component, OnInit, Inject, Input} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BlockModel} from '../../../shared/models/block.model';
import {CourseModel} from '../../../shared/models/course.model';
import {CourseOfferingModel} from '../../../shared/models/course-offering.model';
import {CourseSectionModel} from '../../../shared/models/course-section.model';

@Component({
    selector: 'ohs-office-hour-dialog',
    templateUrl: './office-hour-dialog.component.html',
    styleUrls: ['./office-hour-dialog.component.scss']
})
export class OfficeHourDialogComponent implements OnInit {
    @Input() block: BlockModel;

    form: FormGroup;

    courses: CourseModel[];
    offerings: CourseOfferingModel[];
    sections: CourseSectionModel[];

    constructor(
        private api: ApiService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<OfficeHourDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        if (data) {
            this.block = data.block;
        }
        this.form = this.formBuilder.group({
            startDate: [this.block ? this.block.start.getDate() : ''],
            startTime: [this.block ? this.block.start.getTime() : ''],
            end: [this.block ? this.block.end : ''],
            duration: [this.block ? this.block.duration : ''],
            meetingDuration: [this.block ? this.block.meetingDuration : ''],
            repeating: [this.block ? this.block.repeating : 'none'],
            course: [this.block ? this.block.courseSections : ''],
            courseOffering: [this.block ? this.block.courseSections : ''],
            courseSections: [this.block ? [this.block.courseSections] : []]
        });
    }

    ngOnInit() {
        this.api.getCourses().subscribe(courses => {
            this.courses = courses;
        });
    }

    onClassChange() {
        this.api
            .getCourseOfferings(this.form.controls.course.value)
            .subscribe(offerings => {
                this.offerings = offerings;
            });
    }

    onOfferingChange() {
        this.api
            .getCourseSections(
                this.form.controls.course.value,
                this.form.controls.courseOffering.value
            )
            .subscribe(sections => {
                this.sections = sections;
            });
    }

    save({value, valid}) {
        // TODO: Fix this messy code.
        const [startTime, amPm] = value.startTime.split(' ');
        const [hour, min] = startTime.split(':');

        value.startDate.setHours(
            parseInt(hour, 10) + amPm === 'am' ? 0 : 12,
            parseInt(min, 10)
        );
        value.start = value.startDate;

        const block = value as BlockModel;

        this.api.postBlock(block).subscribe(() => this.dialogRef.close(block));
    }

    deleteBlock() {
        this.api
            .deleteBlock(this.block._id)
            .subscribe(() => this.dialogRef.close(this.block));
    }
}
