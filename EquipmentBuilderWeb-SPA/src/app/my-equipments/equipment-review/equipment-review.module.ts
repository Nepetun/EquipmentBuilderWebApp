import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentReviewComponent } from './equipment-review.component';
import { EquipmentReviewRoutingModule } from './equipment-review.routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [EquipmentReviewComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MaterialModule,
      EquipmentReviewRoutingModule
    ]
  })
export class EquipmentReviewModule {
}
