import {Injectable} from '@angular/core';
import {APP_KEY} from '../../kinvey.tokens';
import {IMessage} from '../../components/shared/interfaces/message.interface';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}`;
  private readonly MESSAGE_URL = this.BASE_URL + '/messages';

  constructor(private http: HttpClient) {
    this._refreshNeeded$ = new Subject<void>();
  }

  private _refreshNeeded$: Subject<void>;

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  postMessage(matchId, userId, content) {
    return this.http.post<IMessage>(this.MESSAGE_URL, {matchId, userId, content}).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  getAllMessages(matchId) {
    const query = {
      matchId
    };
    return this.http.get<IMessage[]>(this.MESSAGE_URL + `?query=${JSON.stringify(query)}&sort={"_kmd.ect": 1}`);
  }

  deleteMessage(messageId: string) {
    return this.http.delete(this.MESSAGE_URL + `/${messageId}`).pipe(tap(() => {
      this._refreshNeeded$.next();
    }));
  }
}
