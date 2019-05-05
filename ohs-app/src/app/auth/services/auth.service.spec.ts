import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule]
        })
    );

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it('should return boolean', () => {
        const service: AuthService = TestBed.get(AuthService);
        let isLoggedIn: boolean;

        isLoggedIn = service.isUserLoggedIn();

        expect(typeof isLoggedIn).toEqual('boolean');
    });

    // it('should return null', () => {
    //     const service: AuthService = TestBed.get(AuthService);
    //     // localStorage.removeItem('token');

    //     const userInfo = service.getUserInfo();

    //     expect(userInfo).toBeNull();
    // });
});
