import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentReviewComponent } from './equipment-review.component';


const routes: Routes = [
  { path: '', component: EquipmentReviewComponent},
  { path: 'equipmentReview', component: EquipmentReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EquipmentReviewRoutingModule {
}
