import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly uploadURL = 'https://api.cloudinary.com/v1_1/vhub/image/upload';
    private readonly getByUsernameURL: string = '/api/account/get/';
    private readonly banByUserIdURL: string = '/api/admin/account/ban/';


    constructor(private http: HttpClient) {
    }

    uploadProfilePicture(formData: FormData) {
        return this.http.post(this.uploadURL, formData);
    }

    getByUsername(username: string) {
        return this.http.get<IUser>(this.getByUsernameURL + username);
    }

    banByUsername(username: string) {
        return this.http.post(this.banByUserIdURL, {username});
    }
}

