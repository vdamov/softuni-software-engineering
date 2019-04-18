import {NgModule} from '@angular/core';
import {MatchBoxComponent} from './match-box/match-box.component';
import {SingleUserResolver} from '../../core/resolvers/single-user.resolver';
import {ConversationComponent} from './conversation/conversation.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: MatchBoxComponent, resolve: {user: SingleUserResolver}},
  {path: ':id/partner/:partnerId', component: ConversationComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MatchRoutingModule {
}
