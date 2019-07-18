import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {WatchComponent} from './watch/watch.component';
import {UploadComponent} from './upload/upload.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'user/profile', component: ProfileComponent},
    {path: 'user/register', component: SignupComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'watch', component: WatchComponent},
    {path: 'upload', component: UploadComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
