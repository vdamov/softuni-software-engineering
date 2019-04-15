import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {APP_KEY, APP_SECRET} from '../../kinvey.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (this.router.url.endsWith('login') || this.router.url.endsWith('register')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: `Kinvey ${token}`,
          'Content-Type': 'application/json'
        }
      });

    }

    return next.handle(req);
  }
}
