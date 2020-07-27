import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../models/pagination';
import { IUserGroupFilter } from '../models/Filters/IUserGroupFilter';
import { IUser } from '../models/IUser';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { GroupService } from '../_services/group.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AdminServiceService } from '../_services/adminService.service';

@Component({
  selector: 'app-userManagementAdmin',
  templateUrl: './userManagementAdmin.component.html',
  styleUrls: ['./userManagementAdmin.component.css']
})
export class UserManagementAdminComponent implements OnInit {
  public userId: number = 0;
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

  allUserFilter: IUserGroupFilter = {
    userNameLike: ''
  };
  usersFromApp: IUser[];

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
    private adminService: AdminServiceService,
    private router: Router
  ) {}

  ngOnInit() {    
    this.userName = this.authService.getUserName();
    this.loading$ = this.groupService.loading$;

    this.reloadValues();
  }

  reloadValues() {
    this.setFilterFromForm();
    this.groupService.loadUserWhichIsNotInSelectedGroup(-1, this.pagination, this.allUserFilter); // -1 zapewni żę nie będzie takiej grupy i zawsze pokaże wszystkich uzytkowników aplikacji
    this.groupService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.groupService. userApp$.subscribe((usrs) => (this.usersFromApp = usrs));
  }

  setFilterFromForm() {
    if (this.formFilter.controls.userNameLikeForm) {
      this.allUserFilter.userNameLike = this.formFilter.controls.userNameLikeForm.value;
    }
  }

  // reloadValuesForAllUsers() {
  //   this.setFilterFromFormAllUsers();
  //   // zaladowanie danych o uzytkownikach ktorzy jeszcze nie należa do grupy i nie otrzymali zaproszenia
  //   this.groupService.loadUserWhichIsNotInSelectedGroup(this.groupId, this.pagination, this.allUserFilter);
  //   this.groupService.pagination$.subscribe(
  //     (value) => (this.pagination = value)
  //   );

  //   this.groupService.userApp$.subscribe((user) => (this.usersFromApp = user));
  // }



  resetFilter() {
    this.allUserFilter = {
      userNameLike: ''
    };
    this.setFormFromFilter();
  }

  setFormFromFilter() {
    this.formFilter.setValue({
      userNameLikeForm: this.allUserFilter.userNameLike
    });
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
      .getUsersWhichIsNotInSelectedGroup(
        -1,
        this.pagination.currentPage,
        this.pagination.itemsPerPage
        // this.userFilter
      )
      .subscribe((usrs) => {
        this.usersFromApp = usrs.result;
      });
  }

  editUser(userId: number) {
    this.userId = userId;
    this.adminService.setSelectedUserId(userId);
    console.log(userId);
    this.router.navigate(["/userManagementPasswordReset"]);
    // tutaj dać załadowanie danych o użytkowniku wybranym -> do zrobienai - oznaczanie wbybranego lub klikniecie edycji
  }

}
