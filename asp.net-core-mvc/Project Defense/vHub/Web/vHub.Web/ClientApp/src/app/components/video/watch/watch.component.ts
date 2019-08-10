import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '../../../core/services/video.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {RateService} from '../../../core/services/rate.service';
import {AuthService} from '../../../core/services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {IRate} from '../../shared/interfaces/rate.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../../../core/services/comment.service';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, OnDestroy {
    @ViewChild('videoplayer') public matVideo;
    public videoHTML: HTMLVideoElement;
    public video: IVideo;
    public rate: IRate;
    public checkIfVoted$: Observable<boolean>;
    public getVideoById$: Observable<IVideo>;
    public subscription: Subscription = new Subscription();

    constructor(public route: ActivatedRoute,
                public router: Router,
                public videoService: VideoService,
                public rateService: RateService,
                public authService: AuthService,
                public commentService: CommentService,
                public modalService: NgbModal) {
    }

    ngOnInit() {
        this.subscription.add(this.route.params
            .subscribe(() => {
                this.matVideo.load();
                this.loadPage();
            })
        );
        this.videoHTML = this.matVideo.getVideoTag();
        this.videoHTML.addEventListener('ended', () => {
            this.subscription.add(this.videoService.addView(this.video.id)
                .subscribe()
            );
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


    like() {
        if (this.authService.isAuthenticated()) {
            this.subscription.add(this.rateService.add(this.video.id, 1).subscribe((res) => {
                    this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
                    this.rate.likes++;
                })
            );
        } else {
            this.router.navigate(['/user/login']);
        }
    }

    dislike() {
        if (this.authService.isAuthenticated()) {
            this.subscription.add(this.rateService.add(this.video.id, 2).subscribe((res) => {
                    this.checkIfVoted$ = this.rateService.checkIfVoted(this.video.id);
                    this.rate.dislikes++;
                })
            );
        } else {
            this.router.navigate(['/user/login']);
        }
    }

    deleteVideo(c: Function) {
        if (this.authService.isAdmin) {
            this.subscription.add(this.videoService.adminDeleteById(this.video.id)
                .subscribe((res) => {
                    c();
                    this.router.navigate(['/home']);
                })
            );
        } else if (this.authService.isAuthenticated()) {
            this.subscription.add(this.videoService.deleteById(this.video.id)
                .subscribe((res) => {
                    c();
                    this.router.navigate(['/home']);
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
