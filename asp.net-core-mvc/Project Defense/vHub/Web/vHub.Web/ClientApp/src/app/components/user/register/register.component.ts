import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {requiredFileType} from '../../video/upload/upload.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './regisiter.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    private textClass: string;
    private passwordStrength: string;
    private readonly strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#\$%\^&\*])(?=.{8,})');
    private readonly mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[!_@#\$%\^&\*]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    private fileFormat = '.jpg, .jpeg, .png';
    private subscription: Subscription = new Subscription();

    public registerForm: FormGroup;
    progress = 0;

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private userService: UserService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            image: [null, [Validators.required, requiredFileType(['jpg', 'jpeg', 'png'])]],
            privacy: [false, [Validators.pattern('true')]],
        });
    }


    register() {
        const profilePictureForm = new FormData();
        profilePictureForm.append('file', this.registerForm.get('image').value);
        profilePictureForm.append('upload_preset', 'urcs4ru3');
        profilePictureForm.append('folder', 'profile-pictures');
        this.subscription.add(this.userService.uploadProfilePicture(profilePictureForm)
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
                this.subscription.add(this.authService.register(form).subscribe(() => {
                        this.router.navigate(['/user/login']);
                    })
                );
            })
        );
    }

    passwordCheck() {
        const password = this.registerForm.get('password').value;
        if (this.strongRegex.test(password)) {
            this.passwordStrength = 'strong';
            this.textClass = 'text-success';
        } else if (this.mediumRegex.test(password)) {
            this.passwordStrength = 'medium';
            this.textClass = 'text-warning';
        } else {
            this.passwordStrength = 'weak';
            this.textClass = 'text-danger';
        }
    }

    open(content) {
        this.modalService.open(content, {windowClass: 'modal-mini', size: 'sm', centered: true});
    }

    accept(c: Function) {
        this.registerForm.get('privacy').setValue(true);
        c();
    }

    close(c: Function) {
        this.registerForm.get('privacy').setValue(false);
        c();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

