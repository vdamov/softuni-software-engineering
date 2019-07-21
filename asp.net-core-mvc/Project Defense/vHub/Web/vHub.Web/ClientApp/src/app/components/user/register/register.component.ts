import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './regisiter.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;


    constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            image: [null, [Validators.required]],
        });
    }

    register() {
        this.userService.register(this.registerForm.value)
            .subscribe(() => {
                this.router.navigate(['/user/login']);
            });
    }
}

