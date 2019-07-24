import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginURL: string = '/api/account/login';
    private readonly registerURL: string = '/api/account/register';
    private readonly uploadURL = 'https://api.cloudinary.com/v1_1/vhub/image/upload';
    private authSubject: BehaviorSubject<boolean>;

    constructor(private http: HttpClient) {
        this.authSubject = new BehaviorSubject(!!localStorage.getItem('access_token'));

    }

    get token() {
        return localStorage.getItem('access_token');
    }

    login(body: IUser) {

        return this.http.post(this.loginURL, body)
            .pipe(tap({
                complete: () => this.authSubject.next(true)
            }));
    }

    register(formData: FormData) {
        return this.http.post(this.registerURL, formData);
    }

    uploadProfilePicture(formData: FormData) {
        return this.http.post(this.uploadURL, formData);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('roles');
        this.authSubject.next(false);
    }

    setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('expires_in', new Date().getTime() + authResult.expires_in);
        localStorage.setItem('roles', authResult.roles);
    }

    isAuthenticated() {
        return this.authSubject.value;
    }
}

