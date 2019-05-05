import {TestBed, async, inject} from '@angular/core/testing';

import {LoggedInGuard} from './logged-in.guard';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoggedInGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoggedInGuard],
            imports: [HttpClientModule, RouterTestingModule]
        });
    });

    it('should ...', inject([LoggedInGuard], (guard: LoggedInGuard) => {
        expect(guard).toBeTruthy();
    }));
});
