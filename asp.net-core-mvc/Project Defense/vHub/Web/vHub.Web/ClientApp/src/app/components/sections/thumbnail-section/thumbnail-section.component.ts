import {Component, Input, OnInit} from '@angular/core';
import {IVideo} from '../../shared/interfaces/video.interface';

@Component({
    selector: 'app-thumbnail-section',
    templateUrl: './thumbnail-section.component.html',
    styleUrls: ['./thumbnail-section.component.css']
})
export class ThumbnailSectionComponent implements OnInit {
    @Input() public video: IVideo;
    public shortenTitle: string;

    constructor() {
    }

    ngOnInit() {
        this.shortenTitle = this.video.title;
        if (this.shortenTitle.length > 18) {
            this.titleSubstring();
        }
    }

    titleSubstring() {
        while (this.shortenTitle.length > 15) {
            const videoArr = this.shortenTitle.split(' ');
            videoArr.pop();
            this.shortenTitle = videoArr.join(' ');
        }
        if (this.video.title !== this.shortenTitle) {
            this.shortenTitle = this.shortenTitle + '...';
        }
    }
}
