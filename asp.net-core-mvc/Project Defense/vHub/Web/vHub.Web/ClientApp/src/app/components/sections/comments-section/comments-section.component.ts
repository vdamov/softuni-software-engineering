import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from '../../../core/services/comment.service';
import {IComment} from '../../shared/interfaces/comment.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-comments-section',
    templateUrl: './comments-section.component.html',
    styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit, OnDestroy {

    private comments: IComment[] = [];
    private page = 0;
    private addCommentForm: FormGroup;
    private videoId: string;
    private subscription: Subscription = new Subscription();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private commentService: CommentService,
        private  authService: AuthService) {

    }

    ngOnInit() {
        this.subscription.add(this.route.params.subscribe((params) => {
            this.videoId = params.id;
            this.comments = [];
            this.page = 0;
            this.getComments();
        }));
        this.addCommentForm = this.fb.group({
            content: [null, [Validators.required]]
        });
    }

    getComments() {
        this.subscription.add(this.commentService.get10ByVideoId(this.page, this.videoId).subscribe((res) => {
                this.comments = this.comments.concat(res);
                ++this.page;
            })
        );
    }

    submitForm() {
        if (this.authService.isAuthenticated()) {
            const context = this.addCommentForm.get('content').value;
            this.subscription.add(this.commentService.add(this.videoId, context).subscribe((res: IComment) => {
                    this.comments.splice(0, 0, res);
                    this.addCommentForm.reset();
                })
            );
        } else {
            this.router.navigate(['/user/login']);
        }
    }


    deleteComment(comment: IComment) {
        if (this.authService.isAdmin) {
            this.subscription.add(this.commentService.adminDeleteById(comment.id).subscribe(() => {
                    this.comments.splice(this.comments.indexOf(comment), 1);
                })
            );
        } else if (this.authService.isAuthenticated().username === comment.authorUsername) {
            this.subscription.add(this.commentService.deleteById(comment.id).subscribe(() => {
                    this.comments.splice(this.comments.indexOf(comment), 1);
                })
            );
        }

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
