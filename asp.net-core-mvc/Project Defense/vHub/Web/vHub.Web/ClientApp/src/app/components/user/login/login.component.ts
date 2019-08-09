import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    public loginForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(private  fb: FormBuilder, private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    login() {
        this.subscription.add(this.authService.login(this.loginForm.value).subscribe(
            (res) => {
                this.authService.setSession(res);
                this.router.navigate(['/home']);
            }
            )
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
