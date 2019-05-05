import { Component, Inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PersonModel } from 'src/app/shared/models/person.model';

@Component({
    selector: 'ohs-person-edit',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.scss']
})
export class CreatePersonComponent implements OnInit {
    @Input() person: PersonModel;

    form: FormGroup;

    constructor(
        private api: ApiService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreatePersonComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        if (data) {
            this.person = data.person;
        }
        this.form = this.formBuilder.group({
            firstName: [this.person ? this.person.firstName : ''],
            lastName: [this.person ? this.person.lastName : ''],
            accessLevel: [this.person ? this.person.accessLevel : '']
        });
    }

    ngOnInit() {}

    save() {
        console.log('save is called');
        const person = this.form.value as PersonModel;
        console.log(person);
        if (this.person == null) {
            this.api.postPerson(person).subscribe(() => this.dialogRef.close(person));
        } else {
            person._id = this.person._id;
            this.api.updatePerson(person).subscribe(() => this.dialogRef.close(person));
        }
    }

    deletePerson() {
        this.api.deletePerson(this.person._id).subscribe(() => this.dialogRef.close());
    }
}
