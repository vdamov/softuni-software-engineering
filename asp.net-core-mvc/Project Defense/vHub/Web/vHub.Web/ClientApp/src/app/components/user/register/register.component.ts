import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './regisiter.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;


    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            image: [null, [Validators.required]],
        });
    }

}

function requiredFileTypes() {
    return function (control: FormControl) {
        const file = control.value;
        if (file) {
            const fileNameToLower = file.name.toLowerCase();
            if (fileNameToLower.endsWith('.jpg') || fileNameToLower.endsWith('.jpeg') || fileNameToLower.endsWith('.png')) {
                return {
                    requiredFileType: true
                };
            }

            return null;
        }

        return null;
    };
}
