import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../../components/shared/interfaces/comment.interface';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly getAllCommentsURL = '/api/comment/getall/';
    private readonly addCommentURL = '/api/comment/add';

    constructor(private http: HttpClient) {
    }

    getAllByVideoId(id: string) {
        return this.http.get<IComment[]>(this.getAllCommentsURL + id);
    }

    add(videoId: string, content: string) {
        return this.http.post(this.addCommentURL, {videoId, content});
    }
}
