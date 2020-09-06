import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesComponent } from './games.component';
import {  GamesRoutingModule } from './games.routing.module';


@NgModule({
    declarations: [GamesComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      GamesRoutingModule
    ]
  })


export class GamesModule {
}
