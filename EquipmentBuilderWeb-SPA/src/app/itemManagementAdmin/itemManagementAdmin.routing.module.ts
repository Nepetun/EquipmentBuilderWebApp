import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemManagementAdminComponent } from './itemManagementAdmin.component';


const routes: Routes = [
    { path: '', component: ItemManagementAdminComponent},
    { path: 'manageAdminItems', component: ItemManagementAdminComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ItemManagementAdminRoutingModule {
}
