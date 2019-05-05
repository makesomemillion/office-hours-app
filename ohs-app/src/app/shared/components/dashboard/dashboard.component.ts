import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlockModel} from '../../models/block.model';
import {MatDialog} from '@angular/material';
import {MeetingsCalendarComponent} from '../meetings-calendar/meetings-calendar.component';
import {CourseGridComponent} from '../course-grid/course-grid.component';
import {CourseSectionModel} from '../../models/course-section.model';
import {StateService} from '../../services/state.service';
import {OfficeHourDialogComponent} from 'src/app/instructor/components/office-hour-dialog/office-hour-dialog.component';

@Component({
    selector: 'ohs-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    officeHourBlocks: BlockModel[];

    filtedOHBlocks: BlockModel[];

    form: FormGroup;

    opened = true;

    displayPage = 'Upcoming Office Hours';

    courseSelection: Array<CourseSectionModel>;

    @ViewChild('calendar') calendar: MeetingsCalendarComponent;

    @ViewChild('courseGrid') courseGrid: CourseGridComponent;

    constructor(
        private formBuilder: FormBuilder,
        private api: ApiService,
        private dialog: MatDialog,
        private state: StateService
    ) {
        this.form = this.formBuilder.group({
            numberInput: [
                '',
                [Validators.required, Validators.pattern('[0-9]+')]
            ]
        });
    }

    getOfficeHourBlocks(): void {
        this.api.getBlocks().subscribe(blocks => {
            this.officeHourBlocks = blocks;
            this.filterBlocks(true);
        });
    }

    filterBlocks(upcoming: boolean): void {
        const now = Date.now();
        if (upcoming) {
            this.filtedOHBlocks = this.officeHourBlocks.filter(block => {
                return now < block.start.getTime();
            });
        } else {
            this.filtedOHBlocks = this.officeHourBlocks.filter(block => {
                return now > block.start.getTime();
            });
        }
    }

    onDisplayPageSelect(displayPage): void {
        this.displayPage = displayPage;
        this.filterBlocks(displayPage === 'Upcoming Office Hours');
    }

    ngOnInit() {
        this.getOfficeHourBlocks();
    }

    createOfficeHour() {
        this.dialog
            .open(OfficeHourDialogComponent, {
                width: '600px'
            })
            .afterClosed()
            .subscribe(() => {
                this.calendar.reloadData();
            });
    }

    clearCourses() {
        this.courseGrid.clearSelection();
    }
}
