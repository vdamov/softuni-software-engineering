import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {SingleUserResolver} from './core/resolvers/single-user.resolver';
import {MatchBoxComponent} from './components/match/match-box/match-box.component';
import {ConversationComponent} from './components/match/conversation/conversation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'match', component: MatchBoxComponent, resolve: {user: SingleUserResolver}},
  {path: 'match/:id/partner/:partnerId', component: ConversationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
