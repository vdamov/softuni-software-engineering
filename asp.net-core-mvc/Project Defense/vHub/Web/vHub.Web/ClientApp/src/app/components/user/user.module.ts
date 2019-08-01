import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {SectionsModule} from '../sections/sections.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from '../../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule,
        SectionsModule,
        CoreModule
    ],
    exports: [LoginComponent]
})
export class UserModule {
}
