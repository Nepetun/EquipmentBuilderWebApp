import { Component, OnInit } from '@angular/core';
import { IGroups } from '../models/IGroups';
import { Observable } from 'rxjs';
import { Pagination } from '../models/pagination';
import { AuthService } from '../_services/auth.service';
import { GroupService } from '../_services/group.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IGroupFilter } from '../models/Filters/IGroupFilter';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {
  public userId: number;
  groups: IGroups[];
  selectedCardIndex = -1;
  selectedGroup = false;
  selectedMyGroup = false;
  userName = '';
  groupId = -1;
  itemsPerPage = 2;
  loading$: Observable<boolean>;
  rotate = true;
  public pagination: Pagination = { currentPage: 1, itemsPerPage: 3, totalItems: 3, totalPages: 2};

  formFilter = this.fb.group(
    {
      groupAdminNameLike: [
        '',
        [Validators.maxLength(20)]
      ],
      groupNameLike: [
        '',
        [Validators.maxLength(20)]
      ]
    });

  groupFilter: IGroupFilter = {
    groupAdminNameLike: '',
    groupNameLike: ''
  };

  constructor(
    private authService: AuthService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserId();
    this.userName = this.authService.getUserName();

    this.loading$ = this.groupService.loading$;

    this.reloadValues();
  }

  reloadValues() {
    this.setFilterFromForm();
    this.groupService.loadGroups(this.userId, this.pagination, this.groupFilter);
    this.groupService.pagination$.subscribe((value) => (this.pagination = value));
    this.groupService.groups$.subscribe((grp) => (this.groups = grp));
  }

  setFilterFromForm() {
    if (this.formFilter.controls.groupAdminNameLike) {
      this.groupFilter.groupAdminNameLike = this.formFilter.controls.groupAdminNameLike.value;
    }
    if (this.formFilter.controls.groupNameLike) {
      this.groupFilter.groupNameLike = this.formFilter.controls.groupNameLike.value;
    }
  }

  resetFilter() {
    this.groupFilter = {
      groupAdminNameLike: '',
      groupNameLike: ''
    };
    this.setFormFromFilter();
  }

  setFormFromFilter() {
    this.formFilter.setValue(
      {
        groupAdminNameLike: this.groupFilter.groupAdminNameLike,
        groupNameLike: this.groupFilter.groupNameLike
      });
  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }

  createGroup() {
    this.router.navigate(['/groups']);
  }

  editSelectedGroup() {
    this.router.navigate(['/groupEditor']);
  }

  manageUsers() {
    this.router.navigate(['/manageUsers']);
  }

  reviewGroupUsers() {
    this.router.navigate(['/groupPreview']);
  }


  higlightSelected(index, groupId: number, groupAdmin: string) {
    this.selectedCardIndex = index;
    this.groupId = groupId;
    this.selectedGroup = true;
    if (groupAdmin === this.userName) {
      this.selectedMyGroup = true;
    } else {
      this.selectedMyGroup = false;
    }
    this.setFocusedGroupId(groupId);
  }

  setFocusedGroupId(id: number) {
    this.groupService.setSelectedGroupId(id);
  }


  // usuwanie grupy - jeżeli jest nasz
  removeGroup() {
    this.groupService.deleteGroup(this.groupId);
    this.groupService.pagination$.subscribe((value) => (this.pagination = value));

    // this.groupService.getGroups(this.userId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((grp) => {
    //   this.groups = grp.result;
    // });

    this.groupService.groups$.subscribe((grp) => (this.groups = grp));
    this.router.navigate(['/myGroups']);
  }



  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.groupService.pagination$.subscribe((value) => (this.pagination = value));

    this.groupService.getGroups(this.userId, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((grp) => {
      this.groups = grp.result;
    });
  }
}
