import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      localStorage.clear();
      this.sidenavToggle.emit();
    });
  }
}
