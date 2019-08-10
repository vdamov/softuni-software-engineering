import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IVideo} from '../../components/shared/interfaces/video.interface';
import {VideoService} from '../services/video.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SingleVideoResolver implements Resolve<IVideo> {
    constructor(public videoService: VideoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVideo> {
        let id: string;
        if (route.params.id) {
            id = route.params.id;
        }
        return this.videoService.getById(id);
    }

}
