import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {CreateCourseComponent} from '../course-edit/create-course.component';
import {CourseModel} from '../../../../shared/models/course.model';


@Component({
    selector: 'ohs-course-listing',
    templateUrl: './course-listing.component.html',
    styleUrls: ['./course-listing.component.scss']
})
export class CourseListingComponent implements OnInit {

    @Output() courseClicked = new EventEmitter<CourseModel>();

    dataSource = new MatTableDataSource<CourseModel>();
    columnsToDisplay = ['departmentCode', 'number', 'name'];

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

    applyFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    onCourseClicked(course: CourseModel) {
        this.courseClicked.emit(course);
    }

    reload() {
        this.api
            .getCourses()
            .subscribe(courses => this.dataSource.data = courses);
    }

    createCourse() {
        this.dialog.open(CreateCourseComponent, {
            width: '600px',
        }).afterClosed().subscribe(() => this.reload());
    }
}
