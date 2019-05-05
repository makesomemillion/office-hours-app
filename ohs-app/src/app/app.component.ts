import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
    selector: 'ohs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    sidenavOpened = true;

    constructor(private authService: AuthService) {
        if (!this.authService.isUserLoggedIn()) {
            this.sidenavOpened = false;
        }
    }

    isUserLoggedIn(): boolean {
        return this.authService.isUserLoggedIn();
    }
}
