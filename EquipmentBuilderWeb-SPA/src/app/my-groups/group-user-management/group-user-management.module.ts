import { NgModule } from '@angular/core';
import { GroupUserManagementComponent } from './group-user-management.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { GroupUserManagementRoutingModule } from './group-user-management.routing.module';


@NgModule({
    declarations: [GroupUserManagementComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MaterialModule,
      GroupUserManagementRoutingModule
    ]
  })

export class GroupUserManagementModule {
}
