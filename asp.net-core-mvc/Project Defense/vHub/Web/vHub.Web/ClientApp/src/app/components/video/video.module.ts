import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchComponent} from './watch/watch.component';
import {UploadComponent} from './upload/upload.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatVideoModule} from 'mat-video';
import {SectionsModule} from '../sections/sections.module';
import {UserModule} from '../user/user.module';
import { SearchComponent } from './search/search.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CategoryComponent} from './category/category.component';

@NgModule({
    declarations: [
        WatchComponent,
        UploadComponent,
        SearchComponent,
        CategoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        MatVideoModule,
        SectionsModule,
        UserModule,

    ]
})
export class VideoModule {
}
