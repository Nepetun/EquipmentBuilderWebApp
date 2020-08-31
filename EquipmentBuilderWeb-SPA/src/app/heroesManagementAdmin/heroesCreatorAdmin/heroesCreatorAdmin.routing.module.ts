import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroesCreatorAdminComponent } from './heroesCreatorAdmin.component';


const routes: Routes = [
    { path: '', component: HeroesCreatorAdminComponent},
    { path: 'heroesCreatorAdmin', component: HeroesCreatorAdminComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class HeroesCreatorAdminRoutingModule {
}
