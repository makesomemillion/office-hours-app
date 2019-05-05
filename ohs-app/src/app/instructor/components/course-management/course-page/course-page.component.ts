import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {ApiService} from '../../../../shared/services/api.service';
import {MatDialog} from '@angular/material';
import {CreateCourseComponent} from '../course-edit/create-course.component';
import {CourseModel} from '../../../../shared/models/course.model';

@Component({
    selector: 'ohs-course-page',
    templateUrl: './course-page.component.html',
    styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

    courseId: string;
    course: CourseModel;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
    ) {
        this.reload();
    }

    ngOnInit() {
    }

    reload() {
        this.route.params
            .pipe(
                map(params => params.courseId),
                tap(courseId => this.courseId = courseId),
                switchMap(courseId => this.api.getCourse(courseId))
            )
            .subscribe(course => {
                    this.course = course;
                    if (course == null) {
                        this.router.navigate(['/instructor/courses']);
                    }
                }
            );
    }

    editCourse() {
        this.dialog.open(CreateCourseComponent, {
            width: '600px',
            data: {course: this.course}
        }).afterClosed().subscribe(() => this.reload());
    }
}
