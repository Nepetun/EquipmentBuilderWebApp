import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesCreatorAdminComponent } from './heroesCreatorAdmin.component';
import { HeroesCreatorAdminRoutingModule } from './heroesCreatorAdmin.routing.module';


@NgModule({
    declarations: [HeroesCreatorAdminComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      HeroesCreatorAdminRoutingModule
    ]
  })


export class HeroesCreatorAdminModule {
}
