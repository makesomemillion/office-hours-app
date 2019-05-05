import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../../../shared/services/api.service';
import {CreateCourseOfferingComponent} from '../course-offering-edit/create-course-offering.component';
import {CourseOfferingModel, Semester} from '../../../../shared/models/course-offering.model';


@Component({
    selector: 'ohs-course-offering-listing',
    templateUrl: './course-offering-listing.component.html',
    styleUrls: ['./course-offering-listing.component.scss']
})
export class CourseOfferingListingComponent implements OnInit {

    @Input() courseId: string;
    @Output() courseOfferingClick = new EventEmitter<CourseOfferingModel>();

    dataSource = new MatTableDataSource<CourseOfferingModel>();
    columnsToDisplay = ['year', 'semester', 'credits'];

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private api: ApiService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.reload();
    }

    reload() {
        this.api
            .getCourseOfferings(this.courseId)
            .subscribe(courseOfferings => this.dataSource.data = courseOfferings);
    }

    applyFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    readableSemester(semester: Semester) {
        switch (semester) {
            case Semester.FALL:
                return 'Fall';
            case Semester.WINTER:
                return 'Winter';
            case Semester.FULL_YEAR:
                return 'Full year';
            case Semester.SUMMER_FIRST_TERM:
                return 'Summer – first term';
            case Semester.SUMMER_SECOND_TERM:
                return 'Summer – second term';
            case Semester.FULL_SUMMER:
                return 'Full summer';
        }
    }

    createOffering() {
        this.dialog.open(CreateCourseOfferingComponent, {
            width: '600px',
            data: {courseId: this.courseId}
        }).afterClosed().subscribe(() => this.reload());
    }

    onOfferingClicked(offering: CourseOfferingModel) {
        this.courseOfferingClick.emit(offering);
    }
}
