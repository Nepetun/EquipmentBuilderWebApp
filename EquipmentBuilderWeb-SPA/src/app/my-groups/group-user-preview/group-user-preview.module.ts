import { NgModule } from '@angular/core';
import { GroupUserPreviewComponent } from './group-user-preview.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { GroupUserPreviewRoutingModule } from './group-user-preview.routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
    declarations: [GroupUserPreviewComponent],
    imports: [
      CommonModule,
      PaginationModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MaterialModule,
      GroupUserPreviewRoutingModule
    ]
  })


export class GroupUserPreviewModule {
}
