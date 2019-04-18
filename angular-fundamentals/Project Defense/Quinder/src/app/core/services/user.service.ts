import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {APP_KEY} from '../../kinvey.tokens';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_URL = `https://baas.kinvey.com/user/${APP_KEY}`;


  constructor(private http: HttpClient) {
  }


  getUserById(id: string): Observable<IUser> {
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

  getAllUsers() {
    return this.http.get<IUser[]>(this.USER_URL);
  }

  updateUser(user: IUser) {
    return this.http.put<IUser>(this.USER_URL + `/${user._id}`, user);
  }


}
