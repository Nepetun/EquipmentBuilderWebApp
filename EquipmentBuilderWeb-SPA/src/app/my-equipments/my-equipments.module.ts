import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEquipmentsRoutingModule } from './my-equipments.routing.module';
import { MyEquipmentsComponent } from './my-equipments.component';



@NgModule({
  declarations: [MyEquipmentsComponent],
  imports: [
    CommonModule,
    MyEquipmentsRoutingModule
  ]
})
export class MyEquipmentsModule { }

