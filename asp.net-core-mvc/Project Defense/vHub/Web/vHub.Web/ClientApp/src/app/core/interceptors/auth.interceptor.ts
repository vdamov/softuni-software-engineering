import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.token}`,
                    'Content-Type': 'application/json'
                }
            });
            return next.handle(req);
        }
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
        return next.handle(req);

    }
}
