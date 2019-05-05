import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {InstructorRoutingModule} from './instructor-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreatePersonComponent} from './components/people-management/person-edit/create-person.component';
import {CreateCourseComponent} from './components/course-management/course-edit/create-course.component';
import {CreateCourseOfferingComponent} from './components/course-management/course-offering-edit/create-course-offering.component';
import {CourseSectionEditComponent} from './components/course-management/course-section-edit/course-section-edit.component';
import {CoursesPageComponent} from './components/course-management/courses-page/courses-page.component';
import {CourseListingComponent} from './components/course-management/course-listing/course-listing.component';
import {CourseOfferingListingComponent} from './components/course-management/course-offering-listing/course-offering-listing.component';
import {CoursePageComponent} from './components/course-management/course-page/course-page.component';
import {CourseOfferingPageComponent} from './components/course-management/course-offering-page/course-offering-page.component';
import {CourseSectionListingComponent} from './components/course-management/course-section-listing/course-section-listing.component';
import {PeoplePageComponent} from './components/people-management/people-page/people-page.component';
import {PeopleListingComponent} from './components/people-management/people-listing/people-listing.component';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        CreatePersonComponent,
        CreateCourseComponent,
        CreateCourseOfferingComponent,
        CourseSectionEditComponent,
        CoursesPageComponent,
        CourseListingComponent,
        CourseOfferingListingComponent,
        CoursePageComponent,
        CourseOfferingPageComponent,
        CourseSectionListingComponent,
        PeoplePageComponent,
        PeopleListingComponent,
    ],
    imports: [
        InstructorRoutingModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
    ],
    providers: [],
    entryComponents: [
        CreateCourseComponent,
        CreateCourseOfferingComponent,
        CourseSectionEditComponent,
        CreatePersonComponent
    ]
})
export class InstructorModule {
}
