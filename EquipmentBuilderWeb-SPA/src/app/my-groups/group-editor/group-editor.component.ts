import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { GroupService } from 'src/app/_services/group.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { IGroupModify } from 'src/app/models/IGroupModify';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.css']
})
export class GroupEditorComponent implements OnInit {

  selectedGroup: number;
  groupPicked: IGroupModify;

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
    // pobranie wybranej id grupy
    this.groupService.selectedGroupId$.subscribe((res) => {
      this.selectedGroup = res;
    });
    this.loadUserId();

    // pobranie group
    this.groupService.getGroupById(this.selectedGroup).subscribe((grp) => {
      this.groupPicked = grp;
      this.loadControlsFromEquipment();
    });
  }

  loadControlsFromEquipment() {
    this.groupInformation.setValue({
      groupName: this.groupPicked.groupName
    });
  }


  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  modifyGroup() {
    let groupToCreate: IGroupModify = {
      groupName: this.groupInformation.controls.groupName.value,
      userId: this.userId, // this.authService.userId,
      groupId: this.selectedGroup
    };

    console.log(groupToCreate);

    this.groupService.updateGroup(groupToCreate).subscribe(
      () => {
        this.alertify.success('ukończono modyfikacje grupy');
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
