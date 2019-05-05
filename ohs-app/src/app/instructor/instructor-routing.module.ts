import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '../shared/components/dashboard/dashboard.component';
import {CoursesPageComponent} from './components/course-management/courses-page/courses-page.component';
import {CoursePageComponent} from './components/course-management/course-page/course-page.component';
import {CourseOfferingPageComponent} from './components/course-management/course-offering-page/course-offering-page.component';
import {NotesPageComponent} from '../shared/components/notes-management/notes-page/notes-page.component';
import {PeoplePageComponent} from './components/people-management/people-page/people-page.component';
import {BlockPageComponent} from '../shared/components/meeting-management/block-page/block-page.component';
import {ViewMeetingComponent} from '../shared/components/meeting-management/view-meeting/view-meeting.component';
import {CommentsPageComponent} from '../shared/components/comments-management/comments-page/comments-page.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'courses/:courseId', component: CoursePageComponent},
    {path: 'courses/:courseId/offerings/:offeringId', component: CourseOfferingPageComponent},
    {path: 'comments', component: CommentsPageComponent},
    {path: 'notes', component: NotesPageComponent},
    {path: 'people', component: PeoplePageComponent},
    {path: 'blocks/:blockId', component: BlockPageComponent},
    {path: 'meetings/:meetingId', component: ViewMeetingComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InstructorRoutingModule {
}
