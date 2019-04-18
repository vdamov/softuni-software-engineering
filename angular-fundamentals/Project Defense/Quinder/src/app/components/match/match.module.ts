import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchBoxComponent} from './match-box/match-box.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {MyDialogComponent} from './my-dialog/my-dialog.component';
import {ConversationComponent} from './conversation/conversation.component';
import {MatchRoutingModule} from './match-routing.module';

@NgModule({
  declarations: [MatchBoxComponent, MyDialogComponent, ConversationComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    MatchRoutingModule
  ],
  exports: [MatchBoxComponent, MyDialogComponent, ConversationComponent],
  entryComponents: [
    MyDialogComponent
  ]
})
export class MatchModule {
}
