import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesManagementAdminComponent } from './heroesManagementAdmin.component';
import { HeroesManagementAdminRoutingModule } from './heroesManagementAdmin.routing.module';


@NgModule({
    declarations: [HeroesManagementAdminComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      HeroesManagementAdminRoutingModule
    ]
  })


export class HeroesManagementModule {
}
