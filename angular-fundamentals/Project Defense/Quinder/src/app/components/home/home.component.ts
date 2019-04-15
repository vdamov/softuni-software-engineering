import {Component, OnInit} from '@angular/core';
import {trigger, keyframes, animate, transition} from '@angular/animations';
import * as kf from './keyframes';
import {AuthService} from '../../core/services/auth.service';
import {MatchService} from '../../core/services/match.service';
import {IUser} from '../shared/interfaces/user.interface';
import {ILike} from '../shared/interfaces/like.interface';
import {IDislike} from '../shared/interfaces/dislike.interface';
import {forkJoin, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {VoteService} from '../../core/services/vote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(600, keyframes(kf.slideOutLeft))),
      transition('* => slideOutRight', animate(600, keyframes(kf.slideOutRight))),
    ])]
})
export class HomeComponent implements OnInit {
  private animationState: string;
  private userDetails: IUser;
  private userLikes$: Observable<ILike[]>;
  private userDislikes$: Observable<IDislike[]>;
  private usersOfInterest$: Observable<IUser[]>;
  private userLikes: ILike[];
  private userDislikes: IDislike[];
  private usersofInterest: IUser[];
  private fork$;
  private match: IUser;

  constructor(private authService: AuthService,
              private matchService: MatchService,
              private voteService: VoteService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.userDetails = this.route.snapshot.data.user;
      const {username, gender, interested, _id} = this.userDetails;
      this.usersOfInterest$ = this.matchService
        .getUsersOfInterest(username, gender, interested);
      this.userLikes$ = this.voteService.getUserLikes(_id);
      this.userDislikes$ = this.voteService.getUserDislikes(_id);
      this.getUser();

    }
  }

  getUser() {
    this.fork$ = forkJoin(this.usersOfInterest$, this.userLikes$, this.userDislikes$).subscribe((arr) => {
      const [usersOfInterest, userLikes, userDislikes] = arr;
      this.getMatch(usersOfInterest, userLikes, userDislikes);
    });
  }

  getMatch(usersOfInterest: IUser[], userLikes: ILike[], userDislikes: IDislike[]) {
    for (const userOfInterest of usersOfInterest) {
      const likes = userLikes.filter((l) => l.likedId === userOfInterest._id);
      const dislikes = userDislikes.filter((d) => d.dislikedId === userOfInterest._id);
      if (!likes.length && !dislikes.length) {
        this.match = userOfInterest;
        return;
      } else {
        this.match = null;
      }

    }
  }

  calculateAge(birthday: string) {
    const birthdayDate = new Date(birthday);
    const ageDifMs = Date.now() - birthdayDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  swipeLeft() {
    this.startAnimation('slideOutLeft');
    const userId = this.userDetails._id;
    const dislikedId = this.match._id;
    this.voteService.postDislike(userId, dislikedId).subscribe((data) => {
      this.getUser();
    });
  }

  swipeRight() {
    this.startAnimation('slideOutRight');

    const userId = this.userDetails._id;
    const likedId = this.match._id;
    this.voteService.postLike(userId, likedId).subscribe((data) => {
      this.checkForMatch(likedId, userId);
      this.getUser();
    });

  }

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  checkForMatch(matchId: string, userId: string) {
    this.voteService.getUserLikes(matchId).subscribe((likes) => {
      if (likes.some(l => l.likedId === userId)) {

      }
    });
  }


  resetAnimationState() {
    this.animationState = '';
  }
}
