import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyGroupsComponent } from './my-groups.component';


const routes: Routes = [
  { path: '', component: MyGroupsComponent},
  { path: 'myGroups', component: MyGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MyGroupsRoutingModule {
}
