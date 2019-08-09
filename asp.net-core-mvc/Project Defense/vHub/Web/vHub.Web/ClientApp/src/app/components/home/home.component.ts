import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoService} from '../../core/services/video.service';
import {IVideo} from '../shared/interfaces/video.interface';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
    private videos: IVideo[] = [];
    private page = 0;
    private subscription: Subscription = new Subscription();

    constructor(private videoService: VideoService) {
    }
    ngOnInit() {
        this.getVideos();
    }

    getVideos() {
        this.subscription.add(this.videoService.get18(this.page).subscribe((res: IVideo[]) => {
                this.videos = this.videos.concat(res);
                ++this.page;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
