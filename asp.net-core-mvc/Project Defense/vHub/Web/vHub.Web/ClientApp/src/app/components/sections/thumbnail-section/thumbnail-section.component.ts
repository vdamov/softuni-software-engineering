import {Component, Input, OnInit} from '@angular/core';
import {IVideo} from '../../shared/interfaces/video.interface';

@Component({
    selector: 'app-thumbnail-section',
    templateUrl: './thumbnail-section.component.html',
    styleUrls: ['./thumbnail-section.component.css']
})
export class ThumbnailSectionComponent implements OnInit {
    @Input() private video: IVideo;

    constructor() {
    }

    ngOnInit() {
    }

}
