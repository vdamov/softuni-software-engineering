import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {MatchService} from '../../../core/services/match.service';
import {IUser} from '../interfaces/user.interface';
import {UserService} from '../../../core/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  public partners: IUser[];
  public userId: string;
  private matchesId: string[];
  private subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private router: Router,
    private matchService: MatchService,
    private userService: UserService) {
    this.userId = localStorage.getItem('userId');
    this.partners = new Array<IUser>();
    this.matchesId = new Array<string>();

  }

  ngOnInit() {

    this.getAllMatches();
    this.subscription.add(this.matchService.refreshNeeded$.subscribe(() => {
      this.getAllMatches();
    }));


  }

  getAllMatches() {

    this.subscription.add(this.matchService.getAllMatches(this.userId).subscribe((matches) => {
      matches = matches.filter(m => !this.matchesId.some(id => id === m._id));
      for (const match of matches) {
        let partnerId = match.users.find(id => id !== this.userId);
        this.subscription.add(this.userService.getUserById(partnerId).subscribe((partner) => {
          this.matchesId.push(match._id);
          this.partners.push(partner);
        }));
      }

    }));
  }

  logout() {
    this.subscription.add(this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      localStorage.clear();
      this.sidenavToggle.emit();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
