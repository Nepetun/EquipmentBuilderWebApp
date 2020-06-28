
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GroupInvitationManagementComponent } from './group-invitation-management.component';

const routes: Routes = [
    { path: '', component: GroupInvitationManagementComponent},
    { path: 'invitationManagement', component: GroupInvitationManagementComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class GroupInvitationManagementRoutingModule {
}
