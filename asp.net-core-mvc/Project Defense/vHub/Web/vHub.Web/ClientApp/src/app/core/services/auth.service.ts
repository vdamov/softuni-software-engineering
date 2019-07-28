import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginURL: string = '/api/account/login';
    private readonly getByIdURL: string = '/api/account/getbyid/';
    private readonly registerURL: string = '/api/account/register';
    private readonly uploadURL = 'https://api.cloudinary.com/v1_1/vhub/image/upload';
    private authSubject: BehaviorSubject<any>;

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
        this.authSubject = new BehaviorSubject(this.parseToken());
    }

    parseToken() {
        const token = this.jwtHelper.decodeToken(this.jwtHelper.tokenGetter());
        if (token === null) {
            return false;
        }
        const username = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        const userId = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return {userId, username};
    }


    login(body: IUser) {

        return this.http.post(this.loginURL, body);
    }

    register(formData: FormData) {
        return this.http.post(this.registerURL, formData);
    }

    uploadProfilePicture(formData: FormData) {
        return this.http.post(this.uploadURL, formData);
    }

    logout() {
        localStorage.removeItem('access_token');
        this.authSubject.next(false);
    }

    setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
        this.authSubject.next(this.parseToken());
    }

    getById(id: string) {
        return this.http.get<IUser>(this.getByIdURL + id);
    }

    isAuthenticated() {
        return this.authSubject.value;
    }
}

