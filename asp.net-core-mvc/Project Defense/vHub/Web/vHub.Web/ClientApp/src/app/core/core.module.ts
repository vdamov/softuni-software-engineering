import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DateAgoPipe} from './pipes/date-ago.pipe';

@NgModule({
    declarations: [DateAgoPipe],
    imports: [
        CommonModule
    ],
    exports: [
        DateAgoPipe
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    ]
})
export class CoreModule {
}
