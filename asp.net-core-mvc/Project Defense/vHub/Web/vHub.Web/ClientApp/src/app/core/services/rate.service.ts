import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRate} from '../../components/shared/interfaces/rate.interface';

@Injectable({
    providedIn: 'root'
})
export class RateService {
    public readonly getAllRatesURL = '/api/rate/getall/';
    public readonly addRateURL = '/api/rate/add/';
    public readonly checkIfVotedURL = '/api/rate/checkifvoted/';
    public readonly allDeletedURL = '/api/admin/rate/alldeleted/';

    constructor(public http: HttpClient) {
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
    getAllDeleted() {
        return this.http.get(this.allDeletedURL);
    }
}
