import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ListProfileComponent} from './list-profile/list-profile.component';
import {ProfileRoutingModule} from './profile-routing.module';

@NgModule({
  declarations: [ViewProfileComponent, EditProfileComponent, ListProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ProfileRoutingModule,
  ],
  exports: [ViewProfileComponent, EditProfileComponent, ListProfileComponent]
})
export class ProfileModule {
}
