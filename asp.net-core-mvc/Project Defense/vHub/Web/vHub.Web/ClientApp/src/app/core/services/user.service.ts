import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly uploadURL = 'https://api.cloudinary.com/v1_1/dmwtou0gd/image/upload';
    private readonly getByUsernameURL: string = '/api/account/get/';
    private readonly banByUsernameURL: string = '/api/admin/account/ban/';
    private readonly allDeletedURL: string = '/api/admin/account/alldeleted/';
    private readonly unbanByUserIdURL: string = '/api/admin/account/unban/';


    constructor(private http: HttpClient) {
    }

    uploadProfilePicture(formData: FormData) {
        return this.http.post(this.uploadURL, formData);
    }

    getByUsername(username: string) {
        return this.http.get<IUser>(this.getByUsernameURL + username);
    }

    banByUsername(username: string) {
        return this.http.post(this.banByUsernameURL, {username});
    }

    getAllDeleted() {
        return this.http.get(this.allDeletedURL);
    }

    unbanById(id: string) {
        return this.http.put(this.unbanByUserIdURL, {id});
    }
}

