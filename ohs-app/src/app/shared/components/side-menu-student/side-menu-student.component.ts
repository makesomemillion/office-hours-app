import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { BookMeetingDialogComponent } from "../../../student/components/book-meeting-dialog/book-meeting-dialog.component";
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: "ohs-side-menu-student",
    templateUrl: "./side-menu-student.component.html",
    styleUrls: ["./side-menu-student.component.scss"]
})
export class SideMenuStudentComponent implements OnInit {
    filterForm: FormGroup;

    filterOptions = [
        { label: 'Upcoming Meetings', selected: true },
        { label: 'Past Meetings', selected: false }
    ];

    constructor(private fb: FormBuilder, public dialog: MatDialog) {
        this.createForm();
    }

    ngOnInit() {}

    createForm(): void {
        this.filterForm = this.fb.group({
            filterOption: new FormControl('', [Validators.required]),
        });
    }

    openDialog(): void {
        console.log('open book dialog');
        const dialogRef = this.dialog.open(BookMeetingDialogComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
