import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemCreatorAdminComponent } from './itemCreatorAdmin.component';
import { ItemCreatorAdminRoutingModule } from './itemCreatorAdmin.routing.module';


@NgModule({
    declarations: [ItemCreatorAdminComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      ItemCreatorAdminRoutingModule
    ]
  })

export class ItemCreatorAdminModule {
}
