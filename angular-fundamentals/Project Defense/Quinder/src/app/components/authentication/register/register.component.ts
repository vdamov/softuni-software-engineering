import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  filteredOptions: Observable<string[]>;
  private subscription: Subscription = new Subscription();
  private readonly imagePattern = /^(http:\/\/|https:\/\/).+$/;
  private cities: string[] = [
    'Sofia',
    'Plovdiv',
    'Varna',
    'Burgas',
    'Ruse',
    'Stara Zagora',
    'Pleven',
    'Sliven',
    'Dobrich',
    'Shumen',
    'Pernik',
    'Haskovo',
    'Yambol',
    'Pazardzhik',
    'Blagoevgrad',
    'Veliko Tarnovo',
    'Vratsa',
    'Gabrovo',
    'Asenovgrad',
    'Vidin'
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      birthDate: [null, Validators.required],
      gender: [null, Validators.required],
      interested: [null, Validators.required],
      username: [null, [Validators.required, Validators.minLength(6)]],
      city: [null, Validators.required],
      image: [null, [Validators.required, Validators.pattern(this.imagePattern)]]
    });


    this.filteredOptions = this.registerForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  register() {
    this.subscription.add(this.authService.signUp(this.registerForm.value).subscribe(() => {
      this.toastr.success(`You can login with your credentials.`, 'Successful registration');
      this.router.navigate(['/login']);
    }));
  }

  private _filter(value: object): string[] {
    // @ts-ignore

    const filterValue = value.city ? value.city.toLowerCase() : '';
    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
