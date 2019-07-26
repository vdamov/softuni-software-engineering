import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {VideoService} from '../../../core/services/video.service';
import {pipe} from 'rxjs';
import {CategoryService} from '../../../core/services/category.service';
import {ICategory} from '../../shared/interfaces/category.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    public progress = 0;
    public uploadForm: FormGroup;
    public categories: ICategory[];

    constructor(private fb: FormBuilder,
                private videoService: VideoService,
                private categoryService: CategoryService,
                private  router: Router) {
    }


    ngOnInit() {
        this.categoryService.getAll().subscribe((res) => {
            this.categories = res;
        });
        this.uploadForm = this.fb.group({
            title: [null, [Validators.required]],
            category: ['', [Validators.required]],
            video: [null, [Validators.required]]
        });
    }

    submit() {
        const videoFormData: FormData = new FormData();
        videoFormData.append('file', this.uploadForm.get('video').value);
        videoFormData.append('upload_preset', 'urcs4ru3');
        videoFormData.append('folder', 'videos');
        this.videoService.upload(videoFormData)
            .pipe(
                uploadProgress(progress => (this.progress = progress)),
                toResponseBody()
            )
            .subscribe((res) => {
                // @ts-ignore
                let thumbnailUrl = res.secure_url.substring(0, res.secure_url.length - 3) + 'jpg';
                const arr = thumbnailUrl.split('/upload/');
                console.log(arr);
                thumbnailUrl = arr[0] + '/upload/w_426,h_240/' + arr[1];
                console.log(thumbnailUrl);
                // @ts-ignore
                const videoUrl = res.secure_url;
                const form: FormData = new FormData();

                form.append('title', this.uploadForm.get('title').value);
                form.append('categoryName', this.uploadForm.get('category').value);
                form.append('thumbnailUrl', thumbnailUrl);
                form.append('videoUrl', videoUrl);


                this.videoService.create(form).subscribe((videoId) => {
                    this.router.navigate(['/watch/' + videoId]);
                });
            });
    }

}

export function uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((100 * event.loaded) / event.total));
        }
    });
}

export function toResponseBody<T>() {
    return pipe(
        filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body)
    );
}
