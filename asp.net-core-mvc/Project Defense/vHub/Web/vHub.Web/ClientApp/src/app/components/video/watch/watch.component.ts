import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../../core/services/video.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {RateService} from '../../../core/services/rate.service';
import {AuthService} from '../../../core/services/auth.service';
import {Observable} from 'rxjs';
import {IRate} from '../../shared/interfaces/rate.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../../../core/services/comment.service';
import {IComment} from '../../shared/interfaces/comment.interface';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
    @ViewChild('videoplayer') private matVideo;
    private videoHTML: HTMLVideoElement;
    private video: IVideo;
    private rate: IRate;
    private checkIfVoted$: Observable<boolean>;
    private getVideoById$: Observable<IVideo>;

    constructor(private route: ActivatedRoute,
                private videoService: VideoService,
                private rateService: RateService,
                private authService: AuthService,
                private commentService: CommentService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(() => {
                this.matVideo.load();
                this.loadPage();
            });
        this.videoHTML = this.matVideo.getVideoTag();
        this.videoHTML.addEventListener('ended', () => {
            this.videoService.addView(this.video.id)
                .subscribe((res) => console.log('view increase'));
        });
    }

    open(content) {
        this.modalService.open(content, {windowClass: 'modal-mini', size: 'sm', centered: true});
    }

    loadPage() {
        this.video = this.route.snapshot.data.video;
        this.rate = this.route.snapshot.data.rate;
        if (this.authService.isAuthenticated()) {
            this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
        }
        this.getVideoById$ = this.videoService.getById(this.video.id);

    }


    like(content) {
        if (this.authService.isAuthenticated()) {
            this.rateService.add(this.video.id, 1).subscribe((res) => {
                this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
                this.rate.likes++;
            });
        } else {
            this.open(content);
        }
    }

    dislike(content) {
        if (this.authService.isAuthenticated()) {
            this.rateService.add(this.video.id, 2).subscribe((res) => {
                this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
                this.rate.dislikes++;
            });
        } else {
            this.open(content);
        }
    }
}
