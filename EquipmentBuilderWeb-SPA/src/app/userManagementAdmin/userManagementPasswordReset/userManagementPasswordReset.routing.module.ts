import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserManagementPasswordResetComponent } from './userManagementPasswordReset.component';

const routes: Routes = [
    { path: '', component: UserManagementPasswordResetComponent},
    { path: 'userManagementPasswordReset', component: UserManagementPasswordResetComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class UserManagementPasswordResetRoutingModule {
}
