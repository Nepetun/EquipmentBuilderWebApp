import { NgModule } from '@angular/core';
import { ProfileUserComponent } from './profileUser.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProfileUserRoutingModule } from './profileUser.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProfileUserComponent],
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule,
      PaginationModule.forRoot(),
      ProfileUserRoutingModule,
      ReactiveFormsModule
    ]
  })

export class ProfileUserModule {
}
