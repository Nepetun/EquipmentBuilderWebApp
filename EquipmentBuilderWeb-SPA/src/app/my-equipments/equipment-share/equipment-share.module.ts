import { EquipmentShareComponent } from './equipment-share.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EquipmentShareRoutingModule } from './equipment-share.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [EquipmentShareComponent],
    imports: [
      CommonModule,
      MaterialModule,
      PaginationModule.forRoot(),
      EquipmentShareRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ]
  })

export class EquipmentShareModule {
}
