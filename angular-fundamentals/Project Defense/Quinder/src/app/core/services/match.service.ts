import {Injectable} from '@angular/core';
import {APP_KEY} from '../../kinvey.tokens';
import {HttpClient} from '@angular/common/http';
import {IMatch} from '../../components/shared/interfaces/match.interface';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}`;

  private readonly MATCH_URL = this.BASE_URL + `/matches`;

  constructor(private http: HttpClient) {
    this._refreshNeeded$ = new Subject<void>();
  }

  private _refreshNeeded$: Subject<void>;

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  postMatch(users: string[]) {
    return this.http.post<IMatch>(this.MATCH_URL, {users})
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }));
  }

  getAllMatches(userId: string): Observable<IMatch[]> {
    const json = {
      users: {$in: [userId]}
    };
    return this.http.get<IMatch[]>(this.MATCH_URL + `?query=${JSON.stringify(json)}`);
  }


}
