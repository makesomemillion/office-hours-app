import {Component, OnInit} from '@angular/core';
import {BlockModel} from '../../../models/block.model';
import {MeetingModel} from '../../../models/meeting.model';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';

@Component({
    selector: 'ohs-block-page',
    templateUrl: './block-page.component.html',
    styleUrls: ['./block-page.component.scss']
})
export class BlockPageComponent implements OnInit {

    block: BlockModel;
    meetings: Array<MeetingModel>;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
    ) {
        this.route.params
            .pipe(
                map(params => params.blockId),
                switchMap(blockId => this.api.getBlock(blockId)),
                tap(block => this.block = block),
                switchMap(() => this.api.getMeetings()),
                tap(meetings => this.meetings = meetings)
            )
            .subscribe();
    }

    // reload() {
    //     console.log('dassaxlar');
    //     console.log(this.block);
    //     const blockStartDate = this.block.start;
    //     const duration = this.block.duration;
    //     const meetDuration = this.block.meetingDuration;
    //     for (const section of this.block.courseSections) {
    //         let startingTime = 0;
    //         const numMeetings = duration / meetDuration;
    //         for (let i = 0; i<numMeetings; i++) {
    //             const startDate = blockStartDate;
    //             startDate.setMinutes(startDate.getMinutes() + startingTime);
    //             const meeting: Partial<MeetingModel> = {
    //                 start: startDate,
    //                 duration: meetDuration,
    //                 isCancelled: false,
    //                 courseSection: section
    //             };
    //             this.api.postMeeting(meeting as MeetingModel).subscribe();
    //             startingTime += meetDuration;
    //         }
    //     }
    // }

    ngOnInit() {
    }

}
