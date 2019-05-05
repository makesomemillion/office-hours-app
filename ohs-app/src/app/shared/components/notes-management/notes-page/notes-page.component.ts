import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {AuthService} from 'src/app/auth/services/auth.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {NoteComponent} from '../note/note.component';
import {NoteModel} from '../../../models/note.model';

@Component({
    selector: 'ohs-notes-page',
    templateUrl: './notes-page.component.html',
    styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {

    @Input() meetingId: string;
    @Output() noteClicked = new EventEmitter<NoteModel>();

    dataSource = new MatTableDataSource<NoteModel>();
    columnsToDisplay = ['timestamp', 'meeting', 'content'];

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private api: ApiService,
        private auth: AuthService,
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

    onNoteClicked(note: NoteModel) {
        // this.noteClicked.emit(note);
        this.dialog.open(NoteComponent, {
            width: '600px',
            data: {note}
        }).afterClosed().subscribe(() => this.reload());
    }

    reload() {
        if (this.meetingId !== undefined) {
            this.api
                .getNotesForMeeting(this.meetingId)
                .subscribe(note => this.dataSource.data = note);
        } else {
            this.api
                .getNotes()
                .subscribe(note => this.dataSource.data = note);
            console.log(this.api.getNotes());
        }
    }

    createNote() {
        this.dialog.open(NoteComponent, {
            width: '600px',
            data: {meetingId: this.meetingId}
        }).afterClosed().subscribe(() => this.reload());
    }

}
