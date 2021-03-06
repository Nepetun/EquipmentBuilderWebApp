import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentEditorComponent } from './equipment-editor.component';


const routes: Routes = [
  { path: '', component: EquipmentEditorComponent},
  { path: 'equipmentEditor', component: EquipmentEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EquipmentEditorRoutingModule {
}
