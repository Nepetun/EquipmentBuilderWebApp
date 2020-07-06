import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html',
  styleUrls: ['./profileUser.component.css']
})
export class ProfileUserComponent implements OnInit {
  bsInlineValue = new Date();
  model: any = {};
  startDate = Date.now();
  profileInformation = this.fb.group(
    {
      passwordNew: [
        '',
        [Validators.required,
        Validators.maxLength(8),
        Validators.minLength(4)]
      ],
      passwordNewApproved: [
        '',
        [Validators.required,
        Validators.maxLength(8),
        Validators.minLength(4)]
      ]
    }
  );


  get passwordNew() {
    return this.profileInformation.get('passwordNew');
  }
  get passwordNewApproved() {
    return this.profileInformation.get('passwordNewApproved');
  }

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    this.model.passwordNew = this.profileInformation.controls.password.value;
    this.model.passwordNewApproved = this.profileInformation.controls.password.value;
/*
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('modyfikacja danych zakończona');
      },
      errror => {
        this.alertify.error(errror);
      }
    );*/
  }

 cancel() {
  this.router.navigate(['/myEquipments']);
 }
}
