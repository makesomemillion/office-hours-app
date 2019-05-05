import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreatePersonComponent } from '../person-edit/create-person.component';
import { PersonModel } from 'src/app/shared/models/person.model';

@Component({
    selector: 'ohs-people-page',
    templateUrl: './people-page.component.html',
    styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
    people = new Array<PersonModel>();

    constructor(private api: ApiService, private router: Router, private dialog: MatDialog) {}

    ngOnInit() {
        this.api.getPeople().subscribe(people => (this.people = people));
    }
}
