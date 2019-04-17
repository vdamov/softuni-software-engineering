import {Injectable} from '@angular/core';
import {APP_KEY} from '../../kinvey.tokens';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {IMatch} from '../../components/shared/interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}`;

  private readonly USER_URL = `https://baas.kinvey.com/user/${APP_KEY}`;
  private readonly MATCH_URL = this.BASE_URL + `/matches`;

  constructor(private http: HttpClient) {
  }

  getUserById(id: string) {
    return this.http.get<IUser>(this.USER_URL + `/${id}`);
  }

  getUsersOfInterest(username: string, gender: string, interest: string) {
    const json = {
      $and: [
        {username: {$ne: username}},
        {gender: interest},
        {interested: gender}
      ]
    };
    return this.http.get<IUser[]>(this.USER_URL + `?query=${JSON.stringify(json)}`);
  }

  postMatch(users: string[]) {
    return this.http.post<IMatch>(this.MATCH_URL, {users});
  }

}
