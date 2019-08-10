import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {IVideo} from '../../shared/interfaces/video.interface';
import {VideoService} from '../../../core/services/video.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-related-section',
    templateUrl: './related-section.component.html',
    styleUrls: ['./related-section.component.css']
})
export class RelatedSectionComponent implements OnInit, OnDestroy {

    @Input() categoryId: string;
    @Input() videoId: string;
    public videos: IVideo[];
    public subscription: Subscription = new Subscription();

    constructor(public videoService: VideoService) {
    }

    ngOnInit() {
        this.subscription.add(this.videoService.take5ByCategoryId(this.categoryId, this.videoId)
            .subscribe((res: IVideo[]) => {
                this.videos = res;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
