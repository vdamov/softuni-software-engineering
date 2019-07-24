import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private readonly createURL = '/api/video/upload';
    private readonly uploadURL = 'https://api.cloudinary.com/v1_1/vhub/video/upload';

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
}
