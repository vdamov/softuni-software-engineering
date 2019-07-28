import {Component, OnInit} from '@angular/core';
import {VideoService} from '../../core/services/video.service';
import {IVideo} from '../shared/interfaces/video.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    private videos: IVideo[];

    constructor(private videoService: VideoService) {
    }

    ngOnInit() {
        this.videoService.getAll().subscribe((res: IVideo[]) => {
            this.videos = res;
        });
    }
}
