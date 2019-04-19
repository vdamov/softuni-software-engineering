import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.subscription.add(this.authService.login(this.loginForm.value).subscribe((user) => {
      this.toastr.success(`Welcome back, ${user.username}!`, 'Logged In');
      this.router.navigate(['match']);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
