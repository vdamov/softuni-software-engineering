import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../../components/shared/interfaces/comment.interface';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly getAllCommentsURL = '/api/comment/getall/';
    private readonly addCommentURL = '/api/comment/add';
    private readonly adminDeleteCommentURL = '/api/admin/comment/delete/';
    private readonly allDeletedURL = '/api/admin/comment/alldeleted/';
    private readonly deleteCommentURL = '/api/comment/delete/';
    private readonly restoreByIdURL = '/api/admin/comment/restore/';

    constructor(private http: HttpClient) {
    }

    getAllByVideoId(id: string) {
        return this.http.get<IComment[]>(this.getAllCommentsURL + id);
    }

    add(videoId: string, content: string) {
        return this.http.post(this.addCommentURL, {videoId, content});
    }

    adminDeleteById(id: string) {
        return this.http.delete(this.adminDeleteCommentURL + id);
    }

    deleteById(id: string) {
        return this.http.delete(this.deleteCommentURL + id);
    }

    getAllDeleted() {
        return this.http.get(this.allDeletedURL);
    }

    restoreById(id: string) {
        return this.http.put(this.restoreByIdURL, {id});
    }
}