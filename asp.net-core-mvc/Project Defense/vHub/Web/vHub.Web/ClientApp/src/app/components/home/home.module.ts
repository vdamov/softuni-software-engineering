import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SectionsModule } from '../sections/sections.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatVideoModule} from 'mat-video';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatVideoModule,
        FormsModule,
        RouterModule,
        SectionsModule
    ],
    declarations: [ HomeComponent ],
    exports: [ HomeComponent ],
    providers: []
})
export class HomeModule { }
