import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroesManagementAdminComponent } from './heroesManagementAdmin.component';


const routes: Routes = [
    { path: '', component: HeroesManagementAdminComponent},
    { path: 'manageAdminHeroes', component: HeroesManagementAdminComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class HeroesManagementAdminRoutingModule {
}
