import { MaterialModule } from '../../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCreatorComponent } from './gameCreator.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameCreatorRoutingModule } from './gameCreator.routing.module';


@NgModule({
    declarations: [GameCreatorComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      GameCreatorRoutingModule
    ]
  })

export class GameCreatorModule {
}
