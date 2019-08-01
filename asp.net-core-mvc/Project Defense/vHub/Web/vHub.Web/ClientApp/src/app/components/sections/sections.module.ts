import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {RouterModule} from '@angular/router';

import {SectionsComponent} from './sections.component';
import {ButtonsSectionComponent} from './buttons-section/buttons-section.component';
import {InputsSectionComponent} from './inputs-section/inputs-section.component';
import {CrsSectionComponent} from './crs-section/crs-section.component';
import {NavigationSectionComponent} from './navigation-section/navigation-section.component';
import {TabsSectionComponent} from './tabs-section/tabs-section.component';
import {AlertsSectionComponent} from './alerts-section/alerts-section.component';
import {TypographySectionComponent} from './typography-section/typography-section.component';
import {AngularSectionComponent} from './angular-section/angular-section.component';
import {NucleoSectionComponent} from './nucleo-section/nucleo-section.component';
import {VersionsSectionComponent} from './versions-section/versions-section.component';

import {CommentsSectionComponent} from './comments-section/comments-section.component';
import {ThumbnailSectionComponent} from './thumbnail-section/thumbnail-section.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {ProgressComponent} from './progress/progress.component';
import {RelatedSectionComponent} from './related-section/related-section.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
    declarations: [
        SectionsComponent,
        ButtonsSectionComponent,
        InputsSectionComponent,
        CrsSectionComponent,
        NavigationSectionComponent,
        TabsSectionComponent,
        AlertsSectionComponent,
        TypographySectionComponent,
        AngularSectionComponent,
        NucleoSectionComponent,
        VersionsSectionComponent,
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
    ],
    exports: [
        SectionsComponent,
        CommentsSectionComponent,
        ThumbnailSectionComponent,
        FileUploadComponent,
        RelatedSectionComponent
    ]
})
export class SectionsModule {
}
