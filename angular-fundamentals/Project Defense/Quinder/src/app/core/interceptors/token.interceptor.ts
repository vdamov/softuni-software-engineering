import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone()).pipe(tap((success) => {
      if (success instanceof HttpResponse && req.url.endsWith('login')) {
        this.authService.saveUserInfo(success.body);
      }
    }));
  }
}
