import { GroupInvitationManagementComponent } from './group-invitation-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { GroupInvitationManagementRoutingModule } from './group-invitation-management.routing.module';

@NgModule({
    declarations: [GroupInvitationManagementComponent],
    imports: [
      CommonModule,
      PaginationModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MaterialModule,
      GroupInvitationManagementRoutingModule
    ]
  })

export class GroupInvitationManagementModule {
}
