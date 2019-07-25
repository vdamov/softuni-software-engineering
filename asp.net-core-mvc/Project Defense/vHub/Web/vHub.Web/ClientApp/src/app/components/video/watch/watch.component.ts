import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../../core/services/video.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {RateService} from '../../../core/services/rate.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
    private video: IVideo;
    private Id: string;
    private likes: number;
    private dislikes: number;
    private hasVoted: boolean;

    constructor(private route: ActivatedRoute,
                private videoService: VideoService,
                private rateService: RateService,
                private authService: AuthService) {
        this.hasVoted = false;
        this.Id = route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        console.log(this.Id);
        this.videoService.getById(this.Id)
            .subscribe((res) => {
                this.video = res;
            });
        if (this.authService.isAuthenticated()) {
            // TODO CHECK IF USER HAS VOTED
        }
        // @ts-ignore
        this.rateService.getAllByVideoId(this.Id).subscribe(({likes, dislikes}) => {
            this.likes = likes;
            this.dislikes = dislikes;
        });


    }

    like() {
        if (this.authService.isAuthenticated() && !this.hasVoted) {
            this.rateService.add(this.Id, 1).subscribe((res) => {
                this.likes++;
                this.hasVoted = true;
            });
        } else {
            // TODO LOGIN MODAL
        }
    }

    dislike() {
        if (this.authService.isAuthenticated() && !this.hasVoted) {
            this.rateService.add(this.Id, 2).subscribe((res) => {
                this.dislikes++;
                this.hasVoted = true;
            });
        } else {
            // TODO LOGIN MODAL
        }
    }

}
