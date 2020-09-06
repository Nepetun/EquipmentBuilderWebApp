
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameCreatorComponent } from './gameCreator.component';


const routes: Routes = [
    { path: '', component: GameCreatorComponent},
    { path: 'adminGamesCreator', component: GameCreatorComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class GameCreatorRoutingModule {
}
