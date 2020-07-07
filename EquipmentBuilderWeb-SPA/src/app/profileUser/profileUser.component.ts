import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserPasswordModify } from '../models/IUserPasswordModify';

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html',
  styleUrls: ['./profileUser.component.css']
})
export class ProfileUserComponent implements OnInit {
  bsInlineValue = new Date();
  public userId: number;
  data: IUserPasswordModify;
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

  ngOnInit() {
    this.loadUserId();
  }


  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  modifyData() {
    let finalData : IUserPasswordModify  = {
      passwordNew: this.profileInformation.controls.passwordNew.value,
      passwordNewApproved: this.profileInformation.controls.passwordNewApproved.value,
      userId: this.userId
    };

    if (finalData.passwordNew !== finalData.passwordNewApproved) {
      this.alertify.warning('hasła nie są identyczne');
    } else {
      this.authService.modifyUserPassword(finalData).subscribe(
        () => {
          this.alertify.success('modyfikacja danych zakończona');
        },
        errror => {
          this.alertify.error(errror);
        }
      );
    }
  }

 cancel() {
  this.router.navigate(['/myEquipments']);
 }
}
