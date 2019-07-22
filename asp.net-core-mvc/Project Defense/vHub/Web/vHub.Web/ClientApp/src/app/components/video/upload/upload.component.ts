import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {VideoService} from '../../../core/services/video.service';
import {pipe} from 'rxjs';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    public progress = 0;
    public uploadForm: FormGroup;

    constructor(private fb: FormBuilder, private videoService: VideoService) {
    }


    ngOnInit() {
        this.uploadForm = this.fb.group({
            title: [null, [Validators.required]],
            video: [null, [Validators.required]]
        });
    }

    submit() {

        this.videoService.upload(toFormData(this.uploadForm.value))
            .pipe(
                uploadProgress(progress => (this.progress = progress)),
                toResponseBody()
            ).subscribe(res => {
            this.progress = 0;
            this.uploadForm.reset();
        });
    }

}

export function toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
        const value = formValue[key];
        formData.append(key, value);
    }

    return formData;
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
