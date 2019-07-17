import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SectionsModule} from '../sections/sections.module';
import {ProfileComponent} from './profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        SectionsModule,
        NgbModule
    ], exports: [ProfileComponent]
})
export class ProfileModule {
}
