import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor() {
    }

    get token() {
        return localStorage.getItem('access_token');
    }

    isAuthenticated() {
        return this.token !== null;
    }
}

