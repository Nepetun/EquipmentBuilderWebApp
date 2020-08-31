import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroesEditorAdminComponent } from './heroesEditorAdmin.component';


const routes: Routes = [
    { path: '', component: HeroesEditorAdminComponent},
    { path: 'heroesEditorAdmin', component: HeroesEditorAdminComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class HeroesEditorAdminRoutingModule {
}
