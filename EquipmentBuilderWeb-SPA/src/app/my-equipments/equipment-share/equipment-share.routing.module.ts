import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentShareComponent } from './equipment-share.component';

const routes: Routes = [
    { path: '', component: EquipmentShareComponent},
    { path: 'equipmentShare', component: EquipmentShareComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class EquipmentShareRoutingModule {
}
