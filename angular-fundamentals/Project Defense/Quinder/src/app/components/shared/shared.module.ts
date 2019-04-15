import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatListModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [

    SidenavComponent,
    ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent
  ],
})
export class SharedModule {
}
