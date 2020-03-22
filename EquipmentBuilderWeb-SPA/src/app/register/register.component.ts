import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  model: any = {};
  // profileInformation = new FormGroup({
  //   userName: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   firstName: new FormControl(''),
  //   surname: new FormControl(''),
  //   dateOfBirth: new FormControl('')
  // });
  profileInformation = this.fb.group({
    userName: ['', Validators.required, Validators.maxLength(20)],
    password: ['', Validators.required, Validators.maxLength(8), Validators.minLength(4)],
    email: ['', Validators.required, Validators.email, Validators.maxLength(20)],
    firstName: ['' , Validators.maxLength(20)],
    surname: ['', Validators.maxLength(50)],
    dateOfBirth: ['']
  });

  get userName() {
    return this.profileInformation.get('userName');
  }
  get password() {
    return this.profileInformation.get('password');
  }

  /*
          [Required(ErrorMessage = "Nazwa użytkownika jest wymagana")] //dzieki takiej adnotacji wymuszamy walidacje na wpisanie username
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Hasło musi miec od 5 do 20 znaków")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Hasło musi miec od 4 do 8 znaków")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Email jest wymagane")]
        [StringLength(20, MinimumLength = 5, ErrorMessage = "Email musi miec od 5 do 20 znaków")]
        public string Email { get; set; }
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Imie nie może przekraczać 20 znaków")]
        public string FirstName { get; set; }
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Nazwisko nie może przekraczać 50 znaków")]
        public string Surname { get; set; }

        public DateTime DateOfBirth { get; set; }
  */
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
        this.alertify.success("registration completed");
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
