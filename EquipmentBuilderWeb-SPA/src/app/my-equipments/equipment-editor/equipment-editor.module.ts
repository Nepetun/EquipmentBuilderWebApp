import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentEditorRoutingModule } from './equipment-editor.routing.module';
import { EquipmentEditorComponent } from './equipment-editor.component';


@NgModule({
    declarations: [EquipmentEditorComponent],
    imports: [
      CommonModule,
      EquipmentEditorRoutingModule
    ]
  })
  export class EquipmentEditorModule {
}
