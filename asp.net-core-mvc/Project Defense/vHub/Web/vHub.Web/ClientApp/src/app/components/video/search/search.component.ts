import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoService} from '../../../core/services/video.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
    private videos: IVideo[] = [];
    private page = 0;
    private query: string;
    private subscription: Subscription = new Subscription();

    constructor(private route: ActivatedRoute,
                private videoService: VideoService) {
    }

    ngOnInit() {
        this.subscription.add(this.route.params.subscribe((params) => {
                this.query = params.query;
                this.page = 0;
                this.videos = [];
                this.getVideos();
            })
        );


    }

    getVideos() {
        this.subscription.add(this.videoService.search(this.page, this.query).subscribe((res) => {
                this.videos = this.videos.concat(res);
                ++this.page;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
