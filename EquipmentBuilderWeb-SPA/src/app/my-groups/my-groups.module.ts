import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MyGroupsRoutingModule } from './my-groups.routing.module';
import { MyGroupsComponent } from './my-groups.component';

@NgModule({
    declarations: [MyGroupsComponent],
    imports: [
      CommonModule,
      MaterialModule,
      PaginationModule.forRoot(),
      MyGroupsRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ]
  })
export class MyGroupsModule {}

