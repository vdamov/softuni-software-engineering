import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SectionsModule} from '../../sections/sections.module';
import {ProfileComponent} from './profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from '../../../core/core.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        SectionsModule,
        NgbModule,
        CoreModule
    ], exports: [ProfileComponent]
})
export class ProfileModule {
}
