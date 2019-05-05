import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {CreatePersonComponent} from '../person-edit/create-person.component';
import { PersonModel } from 'src/app/shared/models/person.model';


@Component({
  selector: 'ohs-people-listing',
  templateUrl: './people-listing.component.html',
  styleUrls: ['./people-listing.component.scss']
})
export class PeopleListingComponent implements OnInit {

  dataSource = new MatTableDataSource<PersonModel>();
  columnsToDisplay = ['firstName', 'lastName', 'accessLevel'];

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

  onPersonClicked(person: PersonModel) {
      this.editPerson(person);
  }

  editPerson(person: PersonModel) {
    console.log('edit');
    this.dialog.open(CreatePersonComponent, {
        width: '600px',
        data: {person}
    }).afterClosed().subscribe(() => this.reload());
  }

  reload() {
      this.api
          .getPeople()
          .subscribe(people => this.dataSource.data = people);
  }

  createPerson() {
      this.dialog.open(CreatePersonComponent, {
          width: '600px',
      }).afterClosed().subscribe(() => this.reload());
  }

}
