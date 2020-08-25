import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserManagementAdminComponent } from './userManagementAdmin.component';

const routes: Routes = [
    { path: '', component: UserManagementAdminComponent},
    { path: 'manageAdminUsers', component: UserManagementAdminComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class UserManagementAdminRoutingModule {
}
