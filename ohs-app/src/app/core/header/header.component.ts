import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ohs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private isSidenavOpen: boolean;

    @Output() sidenavOpenChange = new EventEmitter<boolean>();

    @Input()
    set sidenavOpen(value: boolean) {
        this.isSidenavOpen = value;
        this.sidenavOpenChange.emit(this.isSidenavOpen);
    }

    get sidenavOpen() {
        return this.isSidenavOpen;
    }

    constructor(private authService: AuthService, private router: Router) {}

    toggleSidenav() {
        this.sidenavOpen = !this.sidenavOpen;
    }

    logoutUser(): void {
        const userInfo = this.authService.getUserInfo();
        this.authService.logoutUser(userInfo.username).subscribe(
            (data: any) => {
                console.log('logged out');
                this.router.navigate(['login']);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    goHome(): void {
        this.router.navigate(['']);
    }

    isUserLoggedIn(): boolean {
        return this.authService.isUserLoggedIn();
    }

    ngOnInit() {}
}
