import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../../core/services/video.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {RateService} from '../../../core/services/rate.service';
import {AuthService} from '../../../core/services/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
    private video: IVideo;
    private checkIfVoted$: Observable<boolean>;
    private getAllByVideoId$: Observable<object>;
    private getVideoById$: Observable<IVideo>;

    constructor(private route: ActivatedRoute,
                private videoService: VideoService,
                private rateService: RateService,
                private authService: AuthService) {
        this.loadPage();
    }

    ngOnInit() {
        this.route.params
            .subscribe(() => {
                this.loadPage();
            });
    }


    loadPage() {
        this.video = this.route.snapshot.data.video;
        if (this.authService.isAuthenticated()) {
            this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
        }
        this.getAllByVideoId$ = this.rateService.getAllByVideoId(this.video.id);
        this.getVideoById$ = this.videoService.getById(this.video.id);

    }

    like() {
        if (this.authService.isAuthenticated()) {
            this.rateService.add(this.video.id, 1).subscribe((res) => {
                this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
                this.getAllByVideoId$ = this.rateService.getAllByVideoId(this.video.id);
            });
        } else {
            // TODO LOGIN MODAL
        }
    }

    dislike() {
        if (this.authService.isAuthenticated()) {
            this.rateService.add(this.video.id, 2).subscribe((res) => {
                this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
                this.getAllByVideoId$ = this.rateService.getAllByVideoId(this.video.id);
            });
        } else {
            // TODO LOGIN MODAL
        }
    }
}
