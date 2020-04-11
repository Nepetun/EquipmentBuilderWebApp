import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EquipmentComponent } from './equipment.component';
import { ItemsService } from '../_services/items.service';
import { EquipmentRouting } from './equipment-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [EquipmentComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    MatSelectModule,
    EquipmentRouting
  ],
  providers: [{provide: ItemsService}]
})
export class EquipmentModule { }
