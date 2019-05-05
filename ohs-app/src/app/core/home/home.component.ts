import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {routerNgProbeToken} from '@angular/router/src/router_module';

@Component({
    selector: 'ohs-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        // check is token is available, then validate token
        // navigates to login page iff offline or instructor (for now) if online
        if (this.authService.isUserLoggedIn()) {
            this.authService.validateToken().subscribe(
                data => {
                    if (!this.route.snapshot.parent.url.toString().includes('instructor') &&
                        !this.route.snapshot.parent.url.toString().includes('student')) {
                        this.router.navigate(['instructor']);
                    }
                },
                (error: any) => {
                    localStorage.removeItem('token');
                    this.router.navigate(['login']);
                }
            );
        } else {
            this.router.navigate(['login']);
        }
    }
}
