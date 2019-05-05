import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {CommentComponent} from '../comment/comment.component';
import {CommentModel} from 'src/app/shared/models/comment.model';

@Component({
    selector: 'ohs-comments-page',
    templateUrl: './comments-page.component.html',
    styleUrls: ['./comments-page.component.scss']
})
export class CommentsPageComponent implements OnInit {

    @Input() meetingId: string;
    @Output() commentClicked = new EventEmitter<CommentModel>();

    dataSource = new MatTableDataSource<CommentModel>();
    columnsToDisplay = ['author', 'timestamp', 'meeting', 'content'];

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

    applyFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    onCommentClicked(comment: CommentModel) {
        // this.commentClicked.emit(comment);
        this.dialog.open(CommentComponent, {
            width: '600px',
            data: {comment}
        }).afterClosed().subscribe(() => this.reload());
    }

    reload() {
        if (this.meetingId !== undefined) {
            this.api.getCommentsForMeeting(this.meetingId)
                .subscribe(comment => this.dataSource.data = comment);
        } else {
            this.api
                .getComments()
                .subscribe(comment => this.dataSource.data = comment);
        }
    }

    createComment() {
        this.dialog.open(CommentComponent, {
            width: '600px',
            data: {meetingId: this.meetingId}
        }).afterClosed().subscribe(() => this.reload());
    }

}
