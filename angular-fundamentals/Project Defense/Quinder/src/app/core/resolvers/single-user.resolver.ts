import {IUser} from '../../components/shared/interfaces/user.interface';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SingleUserResolver implements Resolve<IUser> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    let id: string;
    if (route.params.id) {
      id = route.params.id;
    } else {
      id = localStorage.getItem('userId');

    }
    return this.userService.getUserById(id);
  }

}
