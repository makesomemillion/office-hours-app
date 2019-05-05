import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MeetingModel} from '../../../models/meeting.model';

@Component({
    selector: 'ohs-meeting-item',
    templateUrl: './meeting-item.component.html',
    styleUrls: ['./meeting-item.component.scss']
})
export class MeetingItemComponent implements OnInit {

    @Input() meeting: MeetingModel;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onMeetingClicked(meetingId: string) {
        this.router.navigate(['/instructor/meetings', meetingId]);
    }

}
