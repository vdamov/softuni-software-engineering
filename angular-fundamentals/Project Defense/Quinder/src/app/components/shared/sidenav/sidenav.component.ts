import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {MatchService} from '../../../core/services/match.service';
import {IUser} from '../interfaces/user.interface';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  private matchId: string;
  private partners: IUser[];
  private userId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matchService: MatchService,
    private userService: UserService) {
    this.userId = localStorage.getItem('userId');
    this.partners = new Array<IUser>();

  }

  ngOnInit() {

    this.getAllMatches();
    this.matchService.refreshNeeded$.subscribe(() => {
      this.getAllMatches();
    });


  }

  getAllMatches() {
    this.matchService.getAllMatches(this.userId).subscribe((matches) => {
      for (const match of matches) {
        this.matchId = match._id;
        let partnerId = match.users.find(id => id !== this.userId);
        this.userService.getUserById(partnerId).subscribe((partner) => {
          this.partners.push(partner);
        });
      }

    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      localStorage.clear();
      this.sidenavToggle.emit();
    });
  }
}
