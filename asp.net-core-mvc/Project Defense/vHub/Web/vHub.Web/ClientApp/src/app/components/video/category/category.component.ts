import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../core/services/category.service';
import {IVideo} from '../../shared/interfaces/video.interface';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
    public categoryName: string;
    public videos: IVideo[] = [];
    public page = 0;
    public subscription: Subscription = new Subscription();

    constructor(public route: ActivatedRoute, public  categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryName = this.route.snapshot.paramMap.get('name');
        this.getVideos();
    }

    getVideos() {
        this.subscription.add(this.categoryService.get20(this.page, this.categoryName).subscribe((res) => {
                this.videos = this.videos.concat(res);
                ++this.page;
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
