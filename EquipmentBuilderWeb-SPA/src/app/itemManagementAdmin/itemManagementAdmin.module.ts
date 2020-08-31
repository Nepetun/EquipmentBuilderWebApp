import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemManagementAdminComponent } from './itemManagementAdmin.component';
import { ItemManagementAdminRoutingModule } from './itemManagementAdmin.routing.module';


@NgModule({
    declarations: [ItemManagementAdminComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      ItemManagementAdminRoutingModule
    ]
  })


export class ItemManagementAdminModule {
}
