import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserManagementPasswordResetComponent } from './userManagementPasswordReset.component';
import { UserManagementPasswordResetRoutingModule } from './userManagementPasswordReset.routing.module';

@NgModule({
    declarations: [UserManagementPasswordResetComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      UserManagementPasswordResetRoutingModule
    ]
  })


export class UserManagementPasswordResetModule {
}
