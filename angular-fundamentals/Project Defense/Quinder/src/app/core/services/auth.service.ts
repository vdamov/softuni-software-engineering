import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../components/shared/interfaces/user.interface';
import {APP_KEY} from '../../kinvey.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = `https://baas.kinvey.com/user/${APP_KEY}`;

  constructor(
    private http: HttpClient
  ) {
  }


  get token() {
    return localStorage.getItem('token');
  }

  signUp(body: IUser) {
    return this.http.post<IUser>(this.BASE_URL, body);
  }

  login(body: IUser) {
    return this.http.post<IUser>(`${this.BASE_URL}/login`, body);
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/_logout`, {});
  }

  isAuthenticated() {
    return this.token !== null;
  }

  saveUserInfo(res: object) {
    // @ts-ignore
    localStorage.setItem('username', res.username);
    // @ts-ignore
    localStorage.setItem('token', res._kmd.authtoken);
    // @ts-ignore
    localStorage.setItem('userId', res._id);
  }
}
