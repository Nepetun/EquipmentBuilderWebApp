import { Component, OnInit } from '@angular/core';
import { IUserPasswordModify } from 'src/app/models/IUserPasswordModify';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/_services/adminService.service';

@Component({
  selector: 'app-userManagementPasswordReset',
  templateUrl: './userManagementPasswordReset.component.html',
  styleUrls: ['./userManagementPasswordReset.component.css']
})
export class UserManagementPasswordResetComponent implements OnInit {

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
    private userManagementResetService: AdminServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserId();
  }


  loadUserId() {
    this.userManagementResetService.selectedUserId$.subscribe((res) => { this.userId = res; });
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
  this.router.navigate(['/manageUsers']);
 }

}
