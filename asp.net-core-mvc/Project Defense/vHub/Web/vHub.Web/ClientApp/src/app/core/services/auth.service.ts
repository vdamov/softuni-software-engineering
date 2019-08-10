import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly loginURL: string = '/api/account/login';
    public readonly registerURL: string = '/api/account/register';
    public authSubject: BehaviorSubject<any>;
    public admin: boolean;

    constructor(public http: HttpClient, public jwtHelper: JwtHelperService) {
        this.authSubject = new BehaviorSubject(this.parseToken());
    }

    parseToken() {
        if (this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter())) {
            return false;
        }
        const token = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
        if (token === null) {
            return false;
        }

        this.admin = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Administrator';
        const username = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        const userId = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return {userId, username};
    }

    get isAdmin() {
        return this.admin;
    }

    login(body: IUser) {

        return this.http.post(this.loginURL, body);
    }

    register(formData: FormData) {
        return this.http.post(this.registerURL, formData);
    }

    logout() {
        localStorage.removeItem('access_token');
        this.authSubject.next(false);
        this.admin = false;
    }

    setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
        this.authSubject.next(this.parseToken());
    }



    isAuthenticated() {
        return this.authSubject.value;
    }
}

