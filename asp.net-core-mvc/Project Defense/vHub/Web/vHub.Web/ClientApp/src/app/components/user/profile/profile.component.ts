import {Component, OnInit} from '@angular/core';
import {IUser} from '../../shared/interfaces/user.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    private user: IUser;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = this.route.snapshot.data.user;
    }


}
