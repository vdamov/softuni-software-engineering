import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {UserService} from '../../../core/services/user.service';
import {IUser} from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  filteredOptions: Observable<string[]>;
  private subscription: Subscription = new Subscription();
  private user: IUser;
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
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.route.snapshot.data.user;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, Validators.required],
      gender: [null, Validators.required],
      interested: [null, Validators.required],
      username: [null, [Validators.required, Validators.minLength(6)]],
      city: [null, Validators.required],
      image: [null, [Validators.required, Validators.pattern(this.imagePattern)]]
    });
    this.editForm.get('username').setValue(this.user.username);
    this.editForm.get('email').setValue(this.user.email);
    this.editForm.get('city').setValue(this.user.city);
    this.editForm.get('birthDate').setValue(this.user.birthDate);
    this.editForm.get('gender').setValue(this.user.gender);
    this.editForm.get('interested').setValue(this.user.interested);
    this.editForm.get('image').setValue(this.user.image);


    this.filteredOptions = this.editForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  edit() {
    Object.assign(this.user, this.editForm.value);
    this.subscription.add(this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate([`/profile/${this.user._id}/view`]);
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
