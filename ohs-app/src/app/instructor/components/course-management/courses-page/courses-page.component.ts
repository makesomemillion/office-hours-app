import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CourseModel} from '../../../../shared/models/course.model';

@Component({
    selector: 'ohs-courses-page',
    templateUrl: './courses-page.component.html',
    styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

    courses = new Array<CourseModel>();

    constructor(
        private api: ApiService,
        private router: Router,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.api
            .getCourses()
            .subscribe(courses => this.courses = courses);
    }

}
