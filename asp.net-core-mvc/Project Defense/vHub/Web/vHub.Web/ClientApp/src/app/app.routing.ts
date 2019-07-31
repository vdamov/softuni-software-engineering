import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {RegisterComponent} from './components/user/register/register.component';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/user/login/login.component';
import {WatchComponent} from './components/video/watch/watch.component';
import {UploadComponent} from './components/video/upload/upload.component';

import {SingleVideoResolver} from './core/resolvers/single-video.resolver';
import {SingleRateResolver} from './core/resolvers/single-rate.resolver';
import {SingleUserResolver} from './core/resolvers/single-user.resolver';
import {CategoryComponent} from './components/category/category.component';
import {SearchComponent} from './components/video/search/search.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'user/profile/:username', component: ProfileComponent, resolve: {user: SingleUserResolver}},
    {path: 'user/register', component: RegisterComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'category/:name', component: CategoryComponent},
    {path: 'watch/:id', component: WatchComponent, resolve: {video: SingleVideoResolver, rate: SingleRateResolver}},
    {path: 'upload', component: UploadComponent},
    {path: 'search/:query', component: SearchComponent},
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
