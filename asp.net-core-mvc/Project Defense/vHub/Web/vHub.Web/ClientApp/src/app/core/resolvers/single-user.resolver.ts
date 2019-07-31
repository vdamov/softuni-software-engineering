import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {UserService} from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class SingleUserResolver implements Resolve<IUser> {
    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
        let username: string;
        if (route.params.username) {
            username = route.params.username;
        }
        return this.userService.getByUsername(username);
    }

}
