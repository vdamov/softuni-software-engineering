import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatVideoModule} from 'mat-video';
import {WatchComponent} from './watch.component';
import {SectionsModule} from '../../sections/sections.module';
import {RouterModule} from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatVideoModule,
        SectionsModule,
        RouterModule,
    ],
    declarations: [WatchComponent],
    exports: [WatchComponent],
})
export class WatchModule {
}
