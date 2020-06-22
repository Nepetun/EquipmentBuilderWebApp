import { GroupUserManagementComponent } from './group-user-management.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: GroupUserManagementComponent},
    { path: 'manageUsers', component: GroupUserManagementComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class GroupUserManagementRoutingModule {
}
