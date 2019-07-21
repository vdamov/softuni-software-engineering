import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private  fb: FormBuilder, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    login() {
        this.userService.login(this.loginForm.value).subscribe(
            (res) => {
                this.userService.setSession(res);
                this.router.navigate(['/home']);
            }
        );
    }
}
