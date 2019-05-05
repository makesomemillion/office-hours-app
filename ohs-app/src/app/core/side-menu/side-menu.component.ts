import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OfficeHourDialogComponent } from '../../instructor/components/office-hour-dialog/office-hour-dialog.component';
import { AuthService } from '../../auth/services/auth.service';
import { UserTokenInfoModel } from '../../auth/models/user.model';
import { StateService } from '../../shared/services/state.service';
import { CsvDialogComponent } from '../../instructor/components/csv-dialog/csv-dialog.component'

@Component({
    selector: 'ohs-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    user: UserTokenInfoModel;

    constructor(
        private auth: AuthService,
        private router: Router,
        public dialog: MatDialog,
        private state: StateService
    ) {}

    ngOnInit() {
        this.user = this.auth.getUserInfo();
    }

    signOut(): void {
        this.auth
            .logoutUser(this.user.username)
            .subscribe(() => this.router.navigate(['login']).catch(err => console.log(err)), err => console.log(err));
    }

    createOfficeHour() {
        this.dialog
            .open(OfficeHourDialogComponent, {
                width: '600px'
            })
            .afterClosed()
            .subscribe(result => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    uploadClassList() {
        this.dialog.open(CsvDialogComponent, {
            width: '600px'
        })
        .afterClosed()
        .subscribe(result => {
            if (result) {
                window.location.reload();
            }
        });
      }
}
