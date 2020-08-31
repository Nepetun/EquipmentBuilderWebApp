import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemCreatorAdminComponent } from './itemCreatorAdmin.component';


const routes: Routes = [
    { path: '', component: ItemCreatorAdminComponent},
    { path: 'itemCreator', component: ItemCreatorAdminComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class ItemCreatorAdminRoutingModule {
}
