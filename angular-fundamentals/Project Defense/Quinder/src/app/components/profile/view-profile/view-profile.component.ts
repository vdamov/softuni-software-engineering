import {Component, OnInit} from '@angular/core';
import {MatchService} from '../../../core/services/match.service';
import {IUser} from '../../shared/interfaces/user.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  public user: IUser;

  constructor(private matchService: MatchService,
              private route: ActivatedRoute) {
    this.user = this.route.snapshot.data.user;
  }


  ngOnInit() {
  }

}
