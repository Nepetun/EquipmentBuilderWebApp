import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import {   FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../../_services/alertify.service';
import { GroupService } from '../../_services/group.service';
import { IGroupCreate } from '../../models/IGroupCreate';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public userId: number;
  groupInformation = this.fb.group(
    {
      groupName: [
        '', [Validators.required, Validators.maxLength(20),
          Validators.minLength(5)]
      ]
    });

    get groupName() {
      return this.groupInformation.get('groupName');
    }

  constructor(
    private authService: AuthService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadUserId();
  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  saveGroup() {
    // tutaj dać zapis ekwipunku
    let groupToCreate: IGroupCreate = {
      groupName: this.groupInformation.controls.groupName.value,
      userId: this.userId, // this.authService.userId,
      groupId: 0
    };

    console.log(groupToCreate);

    this.groupService.createGroup(groupToCreate).subscribe(
      () => {
        this.alertify.success('ukończono tworzenie grupy');
        this.router.navigate(['/myGroups']);
      },
      errror => {
        this.alertify.error(errror);
      }
    );

  }

  cancel() {
    this.router.navigate(['/myGroups']);
  }

}
