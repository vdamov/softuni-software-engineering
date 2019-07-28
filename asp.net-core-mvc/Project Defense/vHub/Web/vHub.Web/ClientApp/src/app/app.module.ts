import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {RegisterComponent} from './components/user/register/register.component';
import {LandingComponent} from './components/landing/landing.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {FooterComponent} from './components/shared/footer/footer.component';

import {HomeModule} from './components/home/home.module';
import {LoginComponent} from './components/user/login/login.component';
import {WatchModule} from './components/video/watch/watch.module';
import {ProfileModule} from './components/user/profile/profile.module';
import {UploadComponent} from './components/video/upload/upload.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {SectionsModule} from './components/sections/sections.module';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LandingComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        UploadComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                blacklistedRoutes: ['https://api.cloudinary.com/']
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        CoreModule,
        SectionsModule,
        HomeModule,
        WatchModule,
        ProfileModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
