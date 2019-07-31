import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing/landing.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {FooterComponent} from './components/shared/footer/footer.component';

import {HomeModule} from './components/home/home.module';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {SectionsModule} from './components/sections/sections.module';
import {JwtModule} from '@auth0/angular-jwt';
import {UserModule} from './components/user/user.module';
import {VideoModule} from './components/video/video.module';
import { CategoryComponent } from './components/category/category.component';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        NavbarComponent,
        FooterComponent,
        CategoryComponent,
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
        UserModule,
        SectionsModule,
        HomeModule,
        VideoModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
