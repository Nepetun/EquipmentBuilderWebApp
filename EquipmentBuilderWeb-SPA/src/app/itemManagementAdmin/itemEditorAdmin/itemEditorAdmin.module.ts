import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemEditorAdminComponent } from './itemEditorAdmin.component';
import { ItemEditorAdminRoutingModule } from './itemEditorAdmin.routing.module';


@NgModule({
    declarations: [ItemEditorAdminComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      ItemEditorAdminRoutingModule
    ]
  })


export class ItemEditorAdminModule {
}
