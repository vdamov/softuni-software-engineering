import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class HandleErrorInterceptor implements HttpInterceptor {

    constructor(public toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone())
            .pipe(catchError((err) => {
                 this.toastr.error(err.error, 'Error');
                 throw err.error;
            }));
    }
}
