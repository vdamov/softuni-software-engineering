import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {RouterModule} from '@angular/router';




import {CommentsSectionComponent} from './comments-section/comments-section.component';
import {ThumbnailSectionComponent} from './thumbnail-section/thumbnail-section.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {ProgressComponent} from './progress/progress.component';
import {RelatedSectionComponent} from './related-section/related-section.component';
import {CoreModule} from '../../core/core.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [

        CommentsSectionComponent,
        ThumbnailSectionComponent,
        FileUploadComponent,
        ProgressComponent,
        RelatedSectionComponent
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        CoreModule,
        ReactiveFormsModule,
        InfiniteScrollModule
    ],
    exports: [
        CommentsSectionComponent,
        ThumbnailSectionComponent,
        FileUploadComponent,
        RelatedSectionComponent
    ]
})
export class SectionsModule {
}
