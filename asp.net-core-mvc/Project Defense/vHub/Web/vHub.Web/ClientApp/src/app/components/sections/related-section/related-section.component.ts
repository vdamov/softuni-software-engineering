import {Component, OnInit, Input} from '@angular/core';
import {IVideo} from '../../shared/interfaces/video.interface';
import {VideoService} from '../../../core/services/video.service';

@Component({
    selector: 'app-related-section',
    templateUrl: './related-section.component.html',
    styleUrls: ['./related-section.component.css']
})
export class RelatedSectionComponent implements OnInit {

    @Input() categoryId: string;
    @Input() videoId: string;
    private videos: IVideo[];

    constructor(private videoService: VideoService) {
    }

    ngOnInit() {
        this.videoService.take5ByCategoryId(this.categoryId, this.videoId)
            .subscribe((res: IVideo[]) => {
                this.videos = res;
            });
    }

}
