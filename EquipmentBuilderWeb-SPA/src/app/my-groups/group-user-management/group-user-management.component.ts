import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pagination } from 'src/app/models/pagination';
import { IUserGroupFilter } from 'src/app/models/Filters/IUserGroupFilter';
import { IUser } from 'src/app/models/IUser';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { GroupService } from 'src/app/_services/group.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-user-management',
  templateUrl: './group-user-management.component.html',
  styleUrls: ['./group-user-management.component.css']
})
export class GroupUserManagementComponent implements OnInit {

  public userId: number;
  selectedCardIndex = -1;
  selectedGroup = false;
  selectedMyGroup = false;
  userName = '';
  groupId = -1;
  itemsPerPage = 2;
  loading$: Observable<boolean>;
  rotate = true;
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 2,
  };
  userFilter: IUserGroupFilter = {
    userNameLike: ''
  };
  usersFromGroup: IUser[];

  formFilter = this.fb.group(
    {
      userNameLikeForm: [
        '',
        [Validators.maxLength(20)]
      ]
    });

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

    // pobranie wybranej id grupy
    this.groupService.selectedGroupId$.subscribe((res) => {
      this.groupId = res;
    });

    this.loading$ = this.groupService.loading$;

    this.reloadValues();
  }

  reloadValues() {
    this.setFilterFromForm();
    this.groupService.loadUserFromGroup(this.groupId,this.pagination,this.userFilter);
    this.groupService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.groupService.userFromGroup$.subscribe((usrs) => (this.usersFromGroup = usrs));
  }

  setFilterFromForm() {
    if (this.formFilter.controls.userNameLikeForm) {
      this.userFilter.userNameLike = this.formFilter.controls.userNameLikeForm.value;
    }
  }


  resetFilter() {
    this.userFilter = {
      userNameLike: ''
    };
    this.setFormFromFilter();
  }

  setFormFromFilter() {
    this.formFilter.setValue({
      userNameLikeForm: this.userFilter.userNameLike
    });
  }

  loadUserId() {
    let userIdString = this.authService.getUserIdByUserName();
    this.userId = +userIdString;
    console.log(this.userId);
  }
  returnToGroups() {
    this.router.navigate(["/myGroups"]);
  }

  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.groupService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.groupService
      .getUsersFromGroup(
        this.groupId,
        this.pagination.currentPage,
        this.pagination.itemsPerPage
        // this.userFilter
      )
      .subscribe((usrs) => {
        this.usersFromGroup = usrs.result;
      });
  }


  removeUser(userId: number) {
    console.log(userId);
    this.groupService.deleteUserFromGroup(userId, this.groupId);
    this.groupService.loadUserFromGroup(this.groupId, this.pagination, this.userFilter);
    this.groupService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.groupService.userFromGroup$.subscribe((usrs) => (this.usersFromGroup = usrs));
  }


}
