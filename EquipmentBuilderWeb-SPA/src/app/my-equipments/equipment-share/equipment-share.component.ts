import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MyEquipmentService } from 'src/app/_services/my-equipment.service';
import { GroupService } from 'src/app/_services/group.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ISharedEquipments } from 'src/app/models/ISharedEquipments';
import { IGroups } from 'src/app/models/IGroups';
import { group } from 'console';
import { Pagination } from 'src/app/models/pagination';
import { IGroupFilter } from 'src/app/models/Filters/IGroupFilter';

@Component({
  selector: 'app-equipment-share',
  templateUrl: './equipment-share.component.html',
  styleUrls: ['./equipment-share.component.css']
})
export class EquipmentShareComponent implements OnInit {

  equipmentsShared: ISharedEquipments[];
  public userId: number;
  public userName = '';
  groupId = -1;
  groups: IGroups[];
  selectedGroup: number;
  selectedEquipmentId: number;
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 2,
  };
  groupFilter: IGroupFilter = {
    groupAdminNameLike: '',
    groupNameLike: ''
  };

  /*
  V 1) pobranie listy udostępnionych ekwipunków
  2) ponranie grup użytkownika dla których mozę udostępnić ekwipunek
  3) możliwoćś udostępnienia ekwipunku dla grupy do której uzytkownika nalezy
  V 4) mozliwość usuniecia udostępniania ekwipunku ktory jest udostępniony
  */
  constructor(
    private authService: AuthService,
    private equipmentService: MyEquipmentService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.userName = this.authService.getUserName();
    this.loadUserId();


    // pobranie wybranego id ekwipunku
    this.equipmentService.selectedEquipmentId$.subscribe((res) => {
          this.selectedEquipmentId = res;
    });

    // pobranie wybranej id grupy
    this.groupService.selectedGroupId$.subscribe((res) => {
      this.groupId = res;
    });

    // pobranie listy grup użytkownika
    this.groupService.loadGroups(this.userId, this.pagination, this.groupFilter);
    this.groupService.groups$.subscribe((grp) => (this.groups = grp));

    this.equipmentService.getSharedEquipments(this.userId, this.groupId).subscribe((shEq) => {
      this.equipmentsShared = shEq;
    });
  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }


  removeShare(equipmentId: number, groupId: number) {
    this.equipmentService.deleteSharedEquipment(equipmentId, groupId);

    this.equipmentService.getSharedEquipments(this.userId, this.groupId).subscribe((shEq) => {
      this.equipmentsShared = shEq;
    });
    this.router.navigate(['/myEquipments']);
  }

  groupChange(groupId: number) {
    console.log(groupId);
    this.selectedGroup = +groupId;
  }

  shareEquipment() {
    let shareEq: ISharedEquipments = {
      equipmentId: this.selectedEquipmentId,
      groupId: this.selectedGroup,
      equipmentName: '',
      groupName: ''
    };

    this.equipmentService.addShareEquipment(shareEq).subscribe(
      () => {
        this.alertify.success('ukończono udostepnianie ekwipunku');
        this.router.navigate(['/myEquipments']);
      },
      errror => {
        this.alertify.error(errror);
      }
    );
  }

}
