import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IDislike} from '../../components/shared/interfaces/dislike.interface';
import {ILike} from '../../components/shared/interfaces/like.interface';
import {APP_KEY} from '../../kinvey.tokens';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private readonly BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}`;
  private readonly LIKES_URL = `${this.BASE_URL}/likes`;
  private readonly DISLIKES_URL = `${this.BASE_URL}/dislikes`;

  constructor(private http: HttpClient) {
  }

  postLike(userId: string, likedId: string) {
    return this.http.post<ILike>(this.LIKES_URL, {userId, likedId});
  }

  postDislike(userId: string, dislikedId: string) {
    return this.http.post<IDislike>(this.DISLIKES_URL, {userId, dislikedId});
  }

  getUserDislikes(userId: string) {
    const json = {
      userId
    };
    return this.http.get<IDislike[]>(this.DISLIKES_URL + `?query=${JSON.stringify(json)}`);
  }

  getUserLikes(userId: string): Observable<ILike[]> {
    const json = {
      userId
    };
    return this.http.get<ILike[]>(this.LIKES_URL + `?query=${JSON.stringify(json)}`);
  }
}
