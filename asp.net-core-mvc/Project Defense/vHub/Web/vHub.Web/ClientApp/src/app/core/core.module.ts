import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateAgoPipe} from './pipes/date-ago.pipe';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HandleErrorInterceptor} from './interceptors/handle-error.interceptor';

@NgModule({
    declarations: [DateAgoPipe],
    imports: [
        CommonModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        })
    ],
    exports: [
        DateAgoPipe
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HandleErrorInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
}
