import { NgModule } from '@angular/core';
import { GroupEditorComponent } from './group-editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { GroupEditorRoutingModule } from './group-editor.routing.module';


@NgModule({
    declarations: [GroupEditorComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MaterialModule,
      GroupEditorRoutingModule
    ]
  })

export class GroupEditorModule {
}
