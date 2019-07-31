import {Component, OnInit} from '@angular/core';
import {VideoService} from '../../../core/services/video.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    private videos$: Observable<IVideo[]>;
    private query: string;

    constructor(private route: ActivatedRoute,
                private videoService: VideoService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.query = params.query;
            this.videos$ = this.videoService.search(this.query);
        });
    }

}
