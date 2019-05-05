import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private isStudentModule = false;

    private isInstructorModule = false;

    constructor(
        private router: Router,
    ) {
        this.router.events.subscribe(event => {
            // @ts-ignore
            if (event.url) {
                // @ts-ignore
                this.isStudentModule = event.url.includes('student');
                // @ts-ignore
                this.isInstructorModule = event.url.includes('instructor');
            }
        });
    }

    public isStudent() {
        return this.isStudentModule;
    }

    public isInstructor() {
        return this.isInstructorModule;
    }
}
