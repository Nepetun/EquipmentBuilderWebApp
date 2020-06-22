import { Routes, RouterModule } from '@angular/router';
import { GroupUserPreviewComponent } from './group-user-preview.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: GroupUserPreviewComponent},
    { path: 'groupPreview', component: GroupUserPreviewComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class GroupUserPreviewRoutingModule {
}
