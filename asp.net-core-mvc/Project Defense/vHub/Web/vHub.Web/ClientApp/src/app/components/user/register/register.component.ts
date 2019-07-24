import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './regisiter.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    progress = 0;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
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
        const profilePictureForm = new FormData();
        profilePictureForm.append('file', this.registerForm.get('image').value);
        profilePictureForm.append('upload_preset', 'urcs4ru3');
        profilePictureForm.append('folder', 'profile-pictures');
        this.authService.uploadProfilePicture(profilePictureForm)
            .subscribe((res) => {
                const form = new FormData();
                form.append('username', this.registerForm.get('username').value);
                form.append('email', this.registerForm.get('email').value);
                form.append('password', this.registerForm.get('password').value);
                // @ts-ignore
                form.append('imageUrl', res.secure_url);
                this.authService.register(form).subscribe(() => {
                    this.router.navigate(['/user/login']);
                });
            });
    }
}

