import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegisterModel, UserLoginModel, UserModel, UserTokenInfoModel} from '../models/user.model';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {AccessLevel} from 'src/app/shared/models/person.model';
import {ActivatedRoute} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private headers = new HttpHeaders().set('Application-Content', 'application/json; charset=utf-8');
    private peopleUrl = `${environment.universityServerApiRoot}/people`;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
    ) {
    }

    /**
     * Creates a new Person in backend.
     *
     * @param registerForm user registration form data
     */
    registerUser(registerForm: UserRegisterModel): Observable<any> {
        return this.http.post<any>(this.peopleUrl, registerForm, {headers: this.headers});
    }

    /**
     * Logs a user in by creating and giving user a token that is saved in localStorage.
     *
     * @param loginForm user login form data
     */
    loginUser(loginForm: UserLoginModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.peopleUrl}/login`, loginForm, {headers: this.headers}).pipe(
            map(user => {
                console.log(user);
                localStorage.setItem('token', user.token);
                return user;
            })
        );
    }

    /**
     * Logs user out by removing token from localStorage.
     */
    logoutUser(username: string): Observable<any> {
        console.log('logging user out');

        return this.http.post<any>(`${this.peopleUrl}/logout`, {username}, {headers: this.headers}).pipe(
            map(data => {
                console.log(data);
                localStorage.removeItem('token');
                return data;
            })
        );
    }

    /**
     * Refresh user's token iff current token is valid, else log user out.
     */
    validateToken(): Observable<UserModel> {
        console.log('validating token');
        const token = localStorage.getItem('token');
        const username = this.getUserInfo().username;

        return this.http.post(`${this.peopleUrl}/validate`, {token, username}, {headers: this.headers}).pipe(
            map((newToken: UserModel) => {
                console.log(newToken);
                localStorage.setItem('token', newToken.token);
                return newToken;
            })
        );
    }

    /**
     * Decodes token saved in localstorage and returns properties.
     */
    getUserInfo(): UserTokenInfoModel | null {
        const token = localStorage.getItem('token');
        // console.log(token);

        if (!token) {
            return null;
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }

    /**
     * Return true if token exists.
     *
     */
    isUserLoggedIn(): boolean {
        return this.getUserInfo() === null ? false : true;
    }

    /**
     * Returns current user's accessLevel.
     */
    getUserAccessLevel(): string | null {
        const userInfo: UserTokenInfoModel = this.getUserInfo();

        return userInfo === null ? null : userInfo.accessLevel;
    }

    /**
     * Returns true iff the current user is a student or an instructor or TA.
     */
    isStudent(): boolean | null {
        const user: UserTokenInfoModel = this.getUserInfo();

        return user === null
            ? null
            : user.accessLevel === AccessLevel.STUDENT ||
                  user.accessLevel === AccessLevel.INSTRUCTOR ||
                  user.accessLevel === AccessLevel.TEACHING_ASSISTANT;
    }

    /**
     * Returns true iff the current user is an instructor or TA.
     */
    isInstructor(): boolean | null {
        const user: UserTokenInfoModel = this.getUserInfo();

        return user === null
            ? null
            : user.accessLevel === AccessLevel.INSTRUCTOR || user.accessLevel === AccessLevel.TEACHING_ASSISTANT;
    }
}
