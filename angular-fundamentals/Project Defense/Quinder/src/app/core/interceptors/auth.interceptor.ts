import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_KEY, APP_SECRET} from '../../kinvey.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (req.url.endsWith('login') || (req.url.endsWith(APP_KEY) && req.method == 'POST')) {
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
