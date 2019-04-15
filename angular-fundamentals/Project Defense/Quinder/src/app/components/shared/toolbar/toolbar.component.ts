import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
