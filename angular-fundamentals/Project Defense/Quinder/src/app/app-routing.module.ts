import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {HomeGuard} from './core/guards/home.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {UserGuard} from './core/guards/user.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UserGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UserGuard]},
  {path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule', canLoad: [AuthGuard]},
  {path: 'match', loadChildren: './components/match/match.module#MatchModule', canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
