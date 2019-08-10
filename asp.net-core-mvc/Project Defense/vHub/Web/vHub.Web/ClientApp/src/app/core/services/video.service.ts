import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IVideo} from '../../components/shared/interfaces/video.interface';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    public readonly uploadURL = 'https://api.cloudinary.com/v1_1/dmwtou0gd/video/upload/';
    public readonly createURL = '/api/video/upload/';
    public readonly getByIdURL = '/api/video/getbyid/';
    public readonly get20URL = '/api/video/get20/';
    public readonly take5URL = '/api/video/take5/';
    public readonly addViewURL = '/api/video/addview/';
    public readonly searchUrl = '/api/video/search/';
    public readonly adminDeleteURL = '/api/admin/video/delete/';
    public readonly deleteURL = '/api/video/delete/';
    public readonly allDeletedURL = '/api/admin/video/alldeleted/';
    public readonly restoreVideoURL = '/api/admin/video/restore/';

    constructor(public http: HttpClient) {
    }

    create(formData: FormData) {
        return this.http.post(this.createURL, formData);
    }

    upload(formData: FormData) {
        return this.http.post(this.uploadURL, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    getById(id: string) {
        return this.http.get<IVideo>(this.getByIdURL + id);
    }

    get18(page: number) {
        return this.http.get(this.get20URL + page);
    }

    take5ByCategoryId(categoryId: string, videoId: string) {
        return this.http.post(this.take5URL, {categoryId, videoId});
    }

    addView(videoId: string) {
        return this.http.get(this.addViewURL + videoId);

    }

    search(page: number, query: string) {
        return this.http.get<IVideo[]>(this.searchUrl + page + '/' + query);
    }

    adminDeleteById(id: string) {
        return this.http.delete(this.adminDeleteURL + id);
    }

    deleteById(id: string) {
        return this.http.delete(this.deleteURL + id);
    }

    getAllDeleted() {
        return this.http.get(this.allDeletedURL);
    }

    restoreById(id: string) {
        return this.http.put(this.restoreVideoURL, {id});
    }
}
