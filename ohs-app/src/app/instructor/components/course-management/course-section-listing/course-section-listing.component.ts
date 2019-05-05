import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../../../shared/services/api.service';
import {CourseSectionEditComponent} from '../course-section-edit/course-section-edit.component';
import {CourseSectionModel} from '../../../../shared/models/course-section.model';

@Component({
    selector: 'ohs-course-section-listing',
    templateUrl: './course-section-listing.component.html',
    styleUrls: ['./course-section-listing.component.scss']
})
export class CourseSectionListingComponent implements OnInit, OnChanges {

    @Input() courseId: string;
    @Input() offeringId: string;
    @Output() courseSectionClick = new EventEmitter<CourseSectionModel>();

    dataSource = new MatTableDataSource<CourseSectionModel>();
    columnsToDisplay = ['activity', 'number', 'instructors', 'tas', 'students'];

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private api: ApiService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.reload();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.reload();
    }

    reload() {
        if (this.courseId && this.offeringId) {
            this.api
                .getCourseSections(this.courseId, this.offeringId)
                .subscribe(courseOfferings => this.dataSource.data = courseOfferings);
        }
    }

    applyFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    createSection() {
        this.dialog.open(CourseSectionEditComponent, {
            width: '600px',
            data: {courseId: this.courseId, offeringId: this.offeringId}
        }).afterClosed().subscribe(() => this.reload());
    }

    onSectionClicked(section: CourseSectionModel) {
        this.courseSectionClick.emit(section);
    }
}
