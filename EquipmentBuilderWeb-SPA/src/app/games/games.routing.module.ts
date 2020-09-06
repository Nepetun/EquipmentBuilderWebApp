
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GamesComponent } from './games.component';


const routes: Routes = [
    { path: '', component: GamesComponent},
    { path: 'manageAdminGames', component: GamesComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class GamesRoutingModule {
}
