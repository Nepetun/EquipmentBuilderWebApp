import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentEditorRoutingModule } from './equipment-editor.routing.module';
import { EquipmentEditorComponent } from './equipment-editor.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [EquipmentEditorComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MaterialModule,
      EquipmentEditorRoutingModule
    ]
  })
  export class EquipmentEditorModule {
}
