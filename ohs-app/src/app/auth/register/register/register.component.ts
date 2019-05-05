import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'ohs-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    private ngUnsubscribe: Subject<any> = new Subject();
    hidePassword = true;
    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.createForm();
    }

    createForm(): void {
        this.registerForm = this.fb.group({
            username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            accessLevel: new FormControl('', [Validators.required])
        });
    }

    registerUser({ value, valid }): void {
        console.log('registering...');
        console.log(value);
        if (valid) {
            console.log('registering user');

            this.authService
                .registerUser(value)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(
                    data => {
                        console.log('user is registered!', data);
                        // redirect to login page
                        this.router.navigate(['login']);
                    },
                    error => {
                        console.log('error', error);
                    }
                );
        }
    }

    getErrorMessage(inputName: string): string {
        const input = this.registerForm.get(inputName);

        return input.hasError('required')
            ? 'You must enter a value'
            : input.hasError('email')
            ? 'Not a valid email'
            : input.hasError('maxlength')
            ? `${inputName} cannot be greater than 30 characters.`
            : '';
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
