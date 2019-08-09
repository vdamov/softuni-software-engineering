import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../shared/interfaces/user.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

    private user: IUser;
    private subscription: Subscription = new Subscription();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private authService: AuthService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.subscription.add(this.route.params.subscribe(() => {
                this.user = this.route.snapshot.data.user;
            })
        );
    }

    open(content) {
        if (this.authService.isAdmin) {
            this.modalService.open(content, {windowClass: 'modal-mini', size: 'sm', centered: true});
        }
    }

    banUser(close: Function) {
        if (this.authService.isAdmin) {
            this.subscription.add(this.userService.banByUsername(this.user.username).subscribe(() => {
                    close();
                    this.router.navigate(['/home']);
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
