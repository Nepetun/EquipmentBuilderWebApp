import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GroupEditorComponent } from './group-editor.component';

const routes: Routes = [
    { path: '', component: GroupEditorComponent},
    { path: 'groupEditor', component: GroupEditorComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class GroupEditorRoutingModule {
}
