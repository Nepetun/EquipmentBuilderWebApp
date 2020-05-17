import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEquipmentsRoutingModule } from './my-equipments.routing.module';
import { MyEquipmentsComponent } from './my-equipments.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [MyEquipmentsComponent],
  imports: [
    CommonModule,
    MyEquipmentsRoutingModule,
    MaterialModule
  ]
})
export class MyEquipmentsModule { }

