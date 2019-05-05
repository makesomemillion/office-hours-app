import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ohs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
    private ngUnsubscribe: Subject<any> = new Subject();
    loginForm: FormGroup;
    errorMessage = '';

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.createForm();
    }

    createForm(): void {
        this.loginForm = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    loginUser({ value, valid }): void {
        console.log(value);
        if (valid) {
            console.log('logging user in');

            this.authService
                .loginUser(value)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                    data => {
                        console.log('user is logged in!', data);
                        this.router.navigate(['']);
                    },
                    error => {
                        console.log(error);
                        this.errorMessage = error.error;
                    }
                );
        }
    }

    getErrorMessage(inputName: string): string {
        const input = this.loginForm.get(inputName);

        return input.hasError('required') ? 'You must enter a value' : '';
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
