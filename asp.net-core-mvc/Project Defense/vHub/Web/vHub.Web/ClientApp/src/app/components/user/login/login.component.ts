import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private  fb: FormBuilder, private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    login() {
        this.authService.login(this.loginForm.value).subscribe(
            (res) => {
                this.authService.setSession(res);
                this.router.navigate(['/home']);
            }
        );
    }
}
