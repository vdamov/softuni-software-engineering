import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import {Location, PopStateEvent} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';
import {VideoService} from '../../../core/services/video.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private searchForm: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(public location: Location,
                private router: Router,
                private fb: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.subscription.add(this.router.events.subscribe((event) => {
                this.isCollapsed = true;
                if (event instanceof NavigationStart) {
                    if (event.url != this.lastPoppedUrl) {
                        this.yScrollStack.push(window.scrollY);
                    }
                } else if (event instanceof NavigationEnd) {
                    if (event.url == this.lastPoppedUrl) {
                        this.lastPoppedUrl = undefined;
                        window.scrollTo(0, this.yScrollStack.pop());
                    } else {
                        window.scrollTo(0, 0);
                    }
                }
            })
        );
        this.subscription.add(this.location.subscribe((ev: PopStateEvent) => {
                this.lastPoppedUrl = ev.url;
            })
        );
        this.searchForm = this.fb.group({
            query: [null, [Validators.required]]
        });
    }

    searchSubmit() {
        if (this.searchForm.valid) {
            const query = this.searchForm.get('query').value;
            this.router.navigate(['/search', query]);
            this.searchForm.reset();
        }


    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
