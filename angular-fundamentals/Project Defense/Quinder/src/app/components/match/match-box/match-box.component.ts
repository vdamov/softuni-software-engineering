import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {IUser} from '../../shared/interfaces/user.interface';
import {ILike} from '../../shared/interfaces/like.interface';
import {IDislike} from '../../shared/interfaces/dislike.interface';
import {AuthService} from '../../../core/services/auth.service';
import {MatchService} from '../../../core/services/match.service';
import {VoteService} from '../../../core/services/vote.service';
import {ActivatedRoute} from '@angular/router';
import {animate, keyframes, transition, trigger} from '@angular/animations';
import * as kf from './keyframes';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MyDialogComponent} from '../my-dialog/my-dialog.component';
import {IMatch} from '../../shared/interfaces/match.interface';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-match-box',
  templateUrl: './match-box.component.html',
  styleUrls: ['./match-box.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(750, keyframes(kf.slideOutLeft))),
      transition('* => slideOutRight', animate(750, keyframes(kf.slideOutRight))),
    ])]
})
export class MatchBoxComponent implements OnInit, OnDestroy {
  public animationState: string;
  private userDetails: IUser;
  private userLikes$: Observable<ILike[]>;
  private userDislikes$: Observable<IDislike[]>;
  private usersOfInterest$: Observable<IUser[]>;
  public match: IUser;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private matchService: MatchService,
              private userService: UserService,
              private voteService: VoteService,
              private route: ActivatedRoute,
              public dialog: MatDialog
  ) {
  }


  openModal(matchId: string, partnerId: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      matchId,
      partnerId
    };

    const dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);

    this.subscription.add(dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    }));
  }

  ngOnInit() {
    this.userDetails = this.route.snapshot.data.user;
    const {username, gender, interested, _id} = this.userDetails;
    this.usersOfInterest$ = this.userService
      .getUsersOfInterest(username, gender, interested);
    this.userLikes$ = this.voteService.getUserLikes(_id);
    this.userDislikes$ = this.voteService.getUserDislikes(_id);
    this.getUser();
  }


  getUser() {
    this.subscription.add(forkJoin(this.usersOfInterest$, this.userLikes$, this.userDislikes$).subscribe((arr) => {
      const [usersOfInterest, userLikes, userDislikes] = arr;
      this.getMatch(usersOfInterest, userLikes, userDislikes);
    }));
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
    this.subscription.add(this.voteService.postDislike(userId, dislikedId).subscribe(() => {
      this.getUser();
    }));
  }

  swipeRight() {
    this.startAnimation('slideOutRight');

    const userId = this.userDetails._id;
    const likedId = this.match._id;
    this.subscription.add(this.voteService.postLike(userId, likedId).subscribe(() => {
      this.checkForMatch(likedId, userId);
      this.getUser();
    }));

  }

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  checkForMatch(partnerId: string, userId: string) {
    this.subscription.add(this.voteService.getUserLikes(partnerId).subscribe((likes) => {
      if (likes.some(l => l.likedId === userId)) {

        this.subscription.add(this.matchService.postMatch([partnerId, userId]).subscribe((match: IMatch) => {
          this.openModal(match._id, partnerId);
        }));
      }
    }));
  }


  resetAnimationState() {
    this.animationState = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
