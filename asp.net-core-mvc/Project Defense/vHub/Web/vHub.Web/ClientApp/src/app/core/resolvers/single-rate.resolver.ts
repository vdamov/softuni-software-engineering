import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IVideo} from '../../components/shared/interfaces/video.interface';
import {VideoService} from '../services/video.service';
import {Injectable} from '@angular/core';
import {RateService} from '../services/rate.service';
import {IRate} from '../../components/shared/interfaces/rate.interface';

@Injectable({
    providedIn: 'root'
})
export class SingleRateResolver implements Resolve<IRate> {
    constructor(private rateService: RateService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRate> {
        let id: string;
        if (route.params.id) {
            id = route.params.id;
        }
        return this.rateService.getAllByVideoId(id);
    }

}
