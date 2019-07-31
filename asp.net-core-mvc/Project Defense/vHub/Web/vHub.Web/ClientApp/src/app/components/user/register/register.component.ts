import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './regisiter.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    progress = 0;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {
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
        this.userService.uploadProfilePicture(profilePictureForm)
            .subscribe((res) => {
                const form = new FormData();
                form.append('username', this.registerForm.get('username').value);
                form.append('email', this.registerForm.get('email').value);
                form.append('password', this.registerForm.get('password').value);
                // @ts-ignore
                let imageUrl = res.secure_url;
                const arr = imageUrl.split('/upload/');
                imageUrl = arr[0] + '/upload/w_200,h_200/' + arr[1];
                form.append('imageUrl', imageUrl);
                this.authService.register(form).subscribe(() => {
                    this.router.navigate(['/user/login']);
                });
            });
    }
}

