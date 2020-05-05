import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentReviewComponent } from './equipment-review.component';
import { EquipmentReviewRoutingModule } from './equipment-review.routing.module';


@NgModule({
    declarations: [EquipmentReviewComponent],
    imports: [
      CommonModule,
      EquipmentReviewRoutingModule
    ]
  })
export class EquipmentReviewModule {
}
