import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {VideoService} from '../../../core/services/video.service';
import {pipe, Subscription} from 'rxjs';
import {CategoryService} from '../../../core/services/category.service';
import {ICategory} from '../../shared/interfaces/category.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
    public progress = 0;
    public uploadForm: FormGroup;
    public categories: ICategory[];
    public fileFormat = '.mp4';
    public subscription: Subscription = new Subscription();

    constructor(public fb: FormBuilder,
                public videoService: VideoService,
                public categoryService: CategoryService,
                public  router: Router) {
    }


    ngOnInit() {
        this.subscription.add(this.categoryService.getAll().subscribe((res) => {
                this.categories = res;
            })
        );
        this.uploadForm = this.fb.group({
            title: [null, [Validators.required, Validators.maxLength(30)]],
            category: ['', [Validators.required]],
            video: [null, [Validators.required, requiredFileType(['mp4'])]]
        });
    }

    submit() {
        const videoFormData: FormData = new FormData();
        videoFormData.append('file', this.uploadForm.get('video').value);
        videoFormData.append('upload_preset', 'tlccglyv');
        videoFormData.append('folder', 'videos');
        this.subscription.add(this.videoService.upload(videoFormData)
            .pipe(
                uploadProgress(progress => (this.progress = progress)),
                toResponseBody()
            )
            .subscribe((res) => {
                // @ts-ignore
                let thumbnailUrl = res.secure_url.substring(0, res.secure_url.length - 3) + 'jpg';
                const arr = thumbnailUrl.split('/upload/');
                thumbnailUrl = arr[0] + '/upload/w_426,h_240/' + arr[1];
                // @ts-ignore
                const videoUrl = res.secure_url;
                const form: FormData = new FormData();

                form.append('title', this.uploadForm.get('title').value);
                form.append('categoryName', this.uploadForm.get('category').value);
                form.append('thumbnailUrl', thumbnailUrl);
                form.append('videoUrl', videoUrl);


                this.subscription.add(this.videoService.create(form).subscribe((videoId) => {
                        this.router.navigate(['/watch/' + videoId]);
                    })
                );
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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

export function requiredFileType(args: string[]) {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const arr = file.name.split('.');
            const extension = arr[arr.length - 1].toLowerCase();
            if (args) {
                for (let i = 0; i < args.length; i++) {
                    const type = args[i];
                    if (type.toLowerCase() === extension.toLowerCase()) {
                        return null;
                    }

                }
                return {requiredFileType: true};
            }
        }

        return null;
    };

}
