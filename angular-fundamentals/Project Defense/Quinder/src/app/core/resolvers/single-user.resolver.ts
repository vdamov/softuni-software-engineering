import {IUser} from '../../components/shared/interfaces/user.interface';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {MatchService} from '../services/match.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingleUserResolver implements Resolve<IUser> {
  constructor(private matchService: MatchService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    const id = localStorage.getItem('userId');
    return this.matchService.getUserById(id);
  }

}
