import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  filteredOptions: Observable<string[]>;
  private readonly fullNamePattern = /[A-Z][a-z]+ [A-Z][a-z]+/;
  private readonly imagePattern = /^(http:\/\/|https:\/\/).+(\.jpg|\.png)$/;
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
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      birthDate: [null, Validators.required],
      gender: [null, Validators.required],
      interested: [null, Validators.required],
      name: [null, [Validators.required, Validators.pattern(this.fullNamePattern)]],
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
    const {email, password, birthDate} = this.registerForm.value;
// todo
  }

  private _filter(value: object): string[] {
    // @ts-ignore

    const filterValue = value.city ? value.city.toLowerCase() : '';
    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

}
