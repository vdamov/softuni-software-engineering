import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../shared/interfaces/user.interface';
import {UserService} from '../../core/services/user.service';
import {CommentService} from '../../core/services/comment.service';
import {IComment} from '../shared/interfaces/comment.interface';
import {VideoService} from '../../core/services/video.service';
import {IVideo} from '../shared/interfaces/video.interface';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
    private users: IUser[];
    private comments: IComment[];
    private videos: IVideo[];
    private subscription: Subscription = new Subscription();

    constructor(private router: Router,
                private userService: UserService,
                private commentService: CommentService,
                private videoService: VideoService) {
    }

    ngOnInit() {
        this.subscription.add(this.userService.getAllDeleted().subscribe((res: IUser[]) => {
                this.users = res;
            })
        );

        this.subscription.add(this.commentService.getAllDeleted().subscribe((res: IComment[]) => {
                this.comments = res;
            })
        );
        this.subscription.add(this.videoService.getAllDeleted().subscribe((res: IVideo[]) => {
                this.videos = res;
            })
        );
    }

    unbanUser(id: string) {
        this.subscription.add(this.userService.unbanById(id).subscribe(() => {
            this.users = this.users.filter((u) => u.id !== id);
        }));
    }

    restoreVideo(id: string) {
        this.subscription.add(this.videoService.restoreById(id).subscribe(() => {
                this.videos = this.videos.filter((v) => v.id !== id);
            })
        );
    }

    restoreComment(id: string) {
        this.subscription.add(this.commentService.restoreById(id).subscribe(() => {
                this.comments = this.comments.filter((c) => c.id !== id);
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
