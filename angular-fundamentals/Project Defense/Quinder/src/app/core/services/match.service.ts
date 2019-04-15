import {Injectable} from '@angular/core';
import {APP_KEY} from '../../kinvey.tokens';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../components/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly USER_URL = `https://baas.kinvey.com/user/${APP_KEY}`;

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


}
