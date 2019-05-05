import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from '../shared/components/dashboard/dashboard.component';
import {ViewMeetingComponent} from '../shared/components/meeting-management/view-meeting/view-meeting.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'meetings/:meetingId', component: ViewMeetingComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentRoutingModule {
}
