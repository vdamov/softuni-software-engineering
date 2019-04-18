import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {SingleUserResolver} from '../../core/resolvers/single-user.resolver';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ListProfileComponent} from './list-profile/list-profile.component';
import {AdminGuard} from '../../core/guards/admin.guard';

const routes: Routes = [
  {path: ':id/view', component: ViewProfileComponent, resolve: {user: SingleUserResolver}, canActivate: [AdminGuard]},
  {path: ':id/edit', component: EditProfileComponent, resolve: {user: SingleUserResolver}, canActivate: [AdminGuard]},
  {path: 'list', component: ListProfileComponent, resolve: {user: SingleUserResolver}, canActivate: [AdminGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
