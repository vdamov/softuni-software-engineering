import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRate} from '../../components/shared/interfaces/rate.interface';

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
        return this.http.get<IRate>(this.getAllRatesURL + id);
    }

    add(videoId: string, rating: number) {
        return this.http.post(this.addRateURL, {videoId, rating});
    }

    checkIfVoted(videoId: string) {
        return this.http.get<boolean>(this.checkIfVotedURL + videoId);
    }
}
