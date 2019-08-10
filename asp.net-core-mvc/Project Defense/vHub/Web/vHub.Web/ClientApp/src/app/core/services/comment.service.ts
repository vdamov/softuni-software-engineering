import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IComment} from '../../components/shared/interfaces/comment.interface';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    public readonly get10ByVideoIdURL = '/api/comment/get10/';
    public readonly addCommentURL = '/api/comment/add';
    public readonly adminDeleteCommentURL = '/api/admin/comment/delete/';
    public readonly allDeletedURL = '/api/admin/comment/alldeleted/';
    public readonly deleteCommentURL = '/api/comment/delete/';
    public readonly restoreByIdURL = '/api/admin/comment/restore/';

    constructor(public http: HttpClient) {
    }

    get10ByVideoId(page: number, id: string) {
        return this.http.get<IComment[]>(this.get10ByVideoIdURL + page + '/' + id);
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
