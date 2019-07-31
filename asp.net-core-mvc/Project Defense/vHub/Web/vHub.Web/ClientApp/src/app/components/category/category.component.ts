import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../core/services/category.service';
import {IVideo} from '../shared/interfaces/video.interface';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    private categoryName: string;
    private videos: IVideo[];

    constructor(private route: ActivatedRoute, private  categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryName = this.route.snapshot.paramMap.get('name');
        this.categoryService.allVideos(this.categoryName).subscribe((res) => {
            this.videos = res;
        });
    }

}
