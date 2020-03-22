import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyEquipmentsComponent } from './my-equipments.component';


const routes: Routes = [
  { path: '', component: MyEquipmentsComponent},
  { path: 'myEquipments', component: MyEquipmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export  class MyEquipmentsRoutingModule { }
