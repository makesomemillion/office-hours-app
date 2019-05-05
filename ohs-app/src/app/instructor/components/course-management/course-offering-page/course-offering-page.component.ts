import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {map, switchMap, tap} from 'rxjs/operators';
import {CreateCourseOfferingComponent} from '../course-offering-edit/create-course-offering.component';
import {CourseSectionEditComponent} from '../course-section-edit/course-section-edit.component';
import {CourseSectionListingComponent} from '../course-section-listing/course-section-listing.component';
import {CourseModel} from '../../../../shared/models/course.model';
import {CourseOfferingModel} from '../../../../shared/models/course-offering.model';
import {CourseSectionModel} from '../../../../shared/models/course-section.model';


@Component({
    selector: 'ohs-course-offering-page',
    templateUrl: './course-offering-page.component.html',
    styleUrls: ['./course-offering-page.component.scss']
})
export class CourseOfferingPageComponent implements OnInit {

    courseId: string;
    offeringId: string;
    course: CourseModel;
    offering: CourseOfferingModel;

    @ViewChild(CourseSectionListingComponent) sectionListing: CourseSectionListingComponent;

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
                map(params => [params.courseId, params.offeringId]),
                tap(([courseId]) => this.courseId = courseId),
                tap(([_, offeringId]) => this.offeringId = offeringId),
                switchMap(([courseId, offeringId]) => this.api.getCourseOffering(courseId, offeringId))
            )
            .subscribe(({course, offering}) => {
                    this.course = course;
                    this.offering = offering;
                    if (offering == null) {
                        this.router.navigate(['/instructor/courses', this.courseId]);
                    }
                    this.sectionListing.reload();
                }
            );
    }

    editOffering() {
        this.dialog.open(CreateCourseOfferingComponent, {
            width: '600px',
            data: {offering: this.offering}
        }).afterClosed().subscribe(() => this.reload());
    }

    editSection(section: CourseSectionModel) {
        this.dialog.open(CourseSectionEditComponent, {
            width: '600px',
            data: {courseId: this.courseId, offeringId: this.offeringId, section}
        }).afterClosed().subscribe(() => this.reload());
    }
}
