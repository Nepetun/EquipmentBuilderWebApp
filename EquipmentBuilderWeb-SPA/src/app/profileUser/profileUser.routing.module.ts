import { Routes, RouterModule } from '@angular/router';
import { ProfileUserComponent } from './profileUser.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: ProfileUserComponent},
    { path: 'profileUser', component: ProfileUserComponent}
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ProfileUserRoutingModule {
}
