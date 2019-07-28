import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SingleUserResolver implements Resolve<IUser> {
    constructor(private authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
        let id: string;
        if (route.params.id) {
            id = route.params.id;
        }
        return this.authService.getById(id);
    }

}
