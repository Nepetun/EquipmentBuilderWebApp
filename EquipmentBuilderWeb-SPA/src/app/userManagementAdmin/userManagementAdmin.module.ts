import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementAdminComponent } from './userManagementAdmin.component';
import { UserManagementAdminRoutingModule } from './userManagementAdmin.routing.module';

@NgModule({
    declarations: [UserManagementAdminComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      UserManagementAdminRoutingModule
    ]
  })

export class UserManagementAdminModule {
}
