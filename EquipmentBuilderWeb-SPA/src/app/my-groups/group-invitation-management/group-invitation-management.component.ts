import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { InvitationService } from 'src/app/_services/invitation.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/_services/group.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/pagination';
import { IInvitation } from 'src/app/models/IInvitation';
import { IInvitationSend } from 'src/app/models/IInvitationSend';
import { IInvitationOperation } from 'src/app/models/IInvitationOperation';

@Component({
  selector: 'app-group-invitation-management',
  templateUrl: './group-invitation-management.component.html',
  styleUrls: ['./group-invitation-management.component.css']
})
export class GroupInvitationManagementComponent implements OnInit {

  userName = '';
  groupId = -1;
  rotate = true;
  loading$: Observable<boolean>;
  public userId: number;
  public pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
    totalPages: 2,
  };
  invitationsRecived: IInvitation[];


  constructor(
    private authService: AuthService,
    private invitationService: InvitationService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
    ) { }

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

    loadUserId() {
      let userIdString = this.authService.getUserIdByUserName();
      this.userId = +userIdString;
      console.log(this.userId);
    }

  reloadValues() {
    this.invitationService.loadInvitations(this.userId, this.pagination);
    this.invitationService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.invitationService.invitation$.subscribe((inv) => (this.invitationsRecived = inv));
  }


  returnToGroups() {
    this.router.navigate(["/myGroups"]);
  }


  pageChanged(event: any) {
    this.pagination.currentPage = Number(event.page);
    this.invitationService.pagination$.subscribe(
      (value) => (this.pagination = value)
    );

    this.invitationService
      .getInvitations(
        this.groupId,
        this.pagination.currentPage,
        this.pagination.itemsPerPage
        // this.userFilter
      )
      .subscribe((usrs) => {
        this.invitationsRecived = usrs.result;
      });
  }

  accept(invitationId: number, groupId: number) {
    let invitation: IInvitationOperation = {
      invitationId: invitationId,
      userId: this.userId
    };
    this.invitationService.acceptInvitation(invitation).subscribe(
      () => {
        this.alertify.success('zaakceptowano zaproszenie do grupy');
        this.router.navigate(['/groupPreview']);
      },
      errror => {
        this.alertify.error(errror);
      }
    );
  }

  reject(invitationId: number, groupId: number) {
    let invitation: IInvitationOperation = {
      invitationId: invitationId,
      userId: this.userId
    };
    this.invitationService.rejectInvitation(invitation);
    // .subscribe(
    //   () => {
    //     this.alertify.success('odrzucenie zaproszenie do grupy');
    //     this.router.navigate(['/groupPreview']);
    //   },
    //   errror => {
    //     this.alertify.error(errror);
    //   }
    // );
  }

}
