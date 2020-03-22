import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RequiredFieldsValidator } from './register-validators/all-fields-required';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  bsInlineValue = new Date();
  model: any = {};
  startDate = Date.now();
  profileInformation = this.fb.group(
    {
      userName: [
        '',
        [Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5)]
      ],
      password: [
        '',
        [Validators.required,
        Validators.maxLength(8),
        Validators.minLength(4)]
      ],
      email: [
        '',
       [ Validators.required,
        Validators.email,
        Validators.maxLength(20)]
      ],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', Validators.required]
    },
    {
      validator: Validators.compose([RequiredFieldsValidator.bind(this)])
    }
  );

  get userName() {
    return this.profileInformation.get('userName');
  }
  get password() {
    return this.profileInformation.get('password');
  }
  get email() {
    return this.profileInformation.get('email');
  }
  get firstName() {
    return this.profileInformation.get('firstName');
  }
  get surname() {
    return this.profileInformation.get('surname');
  }

  //TODO do zrobienia ogarniczneie na max date mniejsza niz dzisiejsza data - 4 lata
  get dateOfBirth() {
    return this.profileInformation.get('dateOfBirth');
  }

  @Output() cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  register() {
    //tak pobieramy warotosc
    this.model.username = this.profileInformation.controls.userName.value;

    this.model.password = this.profileInformation.controls.password.value;
    this.model.email = this.profileInformation.controls.email.value;
    this.model.firstName = this.profileInformation.controls.firstName.value;
    this.model.surname = this.profileInformation.controls.surname.value;
    this.model.dateOfBirth = this.profileInformation.controls.dateOfBirth.value;

    console.log(this.model);

    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('registration completed');
      },
      errror => {
        this.alertify.error(errror);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
