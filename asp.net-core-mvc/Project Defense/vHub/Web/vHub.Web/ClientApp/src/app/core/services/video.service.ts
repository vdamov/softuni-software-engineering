import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IVideo} from '../../components/shared/interfaces/video.interface';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private readonly createURL = '/api/video/upload/';
    private readonly getByIdURL = '/api/video/getbyid/';
    private readonly uploadURL = 'https://api.cloudinary.com/v1_1/vhub/video/upload/';

    constructor(private http: HttpClient) {
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
}
