import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.authService.isAuthenticated() && (state.url === '/user/login' || state.url === '/user/register')) {
            return true;
        }
        if (this.authService.isAuthenticated() && state.url !== '/user/login' && state.url !== '/user/register') {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}
