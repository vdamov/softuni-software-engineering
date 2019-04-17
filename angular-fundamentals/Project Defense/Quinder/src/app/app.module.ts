import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './components/shared/shared.module';
import {CoreModule} from './core/core.module';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatchModule} from './components/match/match.module';
import {MaterialModule} from './material.module';
import {MyDialogComponent} from './components/match/my-dialog/my-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    MatchModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyDialogComponent
  ]
})
export class AppModule {
}
