import { Component, OnInit, Input } from '@angular/core';
import { OfficeHourDialogComponent } from '../../../../instructor/components/office-hour-dialog/office-hour-dialog.component';
import { MatDialog } from '@angular/material';
import { BlockModel } from '../../../models/block.model';
import { Router } from '@angular/router';

@Component({
    selector: 'ohs-office-hour-list-item',
    templateUrl: './office-hour-list-item.component.html',
    styleUrls: ['./office-hour-list-item.component.scss']
})
export class OfficeHourListItemComponent implements OnInit {
    @Input() officeHour: BlockModel;

    endTime: Date;
    meetingCount: number;

    constructor(private dialog: MatDialog, private router: Router) {}

    ngOnInit() {
        // TODO: fix this horrible code
        if (this.officeHour) {
            this.endTime = new Date(this.officeHour.start.getTime());
            this.endTime.setMinutes(this.officeHour.start.getMinutes() + this.officeHour.duration);
            this.meetingCount = Math.floor(this.officeHour.duration / this.officeHour.meetingDuration);
        }
    }

    editBlock(block: BlockModel) {
        this.dialog.open(OfficeHourDialogComponent, {
            width: '600px',
            data: { block }
        });
    }

    viewMeetings(block: BlockModel) {
        this.router.navigate(['instructor', 'blocks', block._id]);
    }
}
