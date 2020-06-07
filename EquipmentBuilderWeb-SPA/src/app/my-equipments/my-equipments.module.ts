import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEquipmentsRoutingModule } from './my-equipments.routing.module';
import { MyEquipmentsComponent } from './my-equipments.component';
import { MaterialModule } from '../material.module';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [MyEquipmentsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PaginationModule.forRoot(),
    MyEquipmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyEquipmentsModule { }

