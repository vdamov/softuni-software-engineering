import {Injectable} from '@angular/core';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Form} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly loginURL: string = '/api/account/login';
    private readonly registerURL: string = '/api/account/register';

    constructor(private http: HttpClient) {
    }

    login(body: IUser) {

        return this.http.post<IUser>(this.loginURL, body);
    }

    register(formData: FormData) {
        return this.http.post<IUser>(this.registerURL, formData);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('roles');
    }

    setSession(authResult) {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('expires_in', new Date().getTime() + authResult.expires_in);
        localStorage.setItem('roles', authResult.roles);
    }
}
