import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RateService {
    private readonly getAllRatesURL = '/api/rate/getall/';
    private readonly addRateURL = '/api/rate/add/';
    private readonly checkIfVotedURL = '/api/rate/checkifvoted/';

    constructor(private http: HttpClient) {
    }

    getAllByVideoId(id: string) {
        return this.http.get(this.getAllRatesURL + id);
    }

    add(videoId: string, rating: number) {
        return this.http.post(this.addRateURL, {videoId, rating});
    }

    checkIfVoted(videoId: string) {
        return this.http.post<boolean>(this.checkIfVotedURL, {videoId});
    }
}
