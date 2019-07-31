import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../../core/services/comment.service';
import {IComment} from '../../shared/interfaces/comment.interface';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-comments-section',
    templateUrl: './comments-section.component.html',
    styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {
    private comments: IComment[];
    private addCommentForm: FormGroup;
    private videoId: string;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private commentService: CommentService,
        private  authService: AuthService) {

    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.videoId = params.id;
            this.commentService.getAllByVideoId(this.videoId).subscribe((res) => this.comments = res);
        });
        this.addCommentForm = this.fb.group({
            content: [null, [Validators.required]]
        });
    }

    submitForm() {
        if (this.addCommentForm.valid && this.authService.isAuthenticated()) {
            const context = this.addCommentForm.get('content').value;
            this.commentService.add(this.videoId, context).subscribe((res: IComment) => {
                this.comments.splice(0, 0, res);
                this.addCommentForm.reset();
            });
        }
    }


}
