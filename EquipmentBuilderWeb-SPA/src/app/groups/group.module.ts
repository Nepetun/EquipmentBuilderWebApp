import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import {MatSelectModule} from '@angular/material/select';
import { GroupService } from '../_services/group.service';
import { GroupRoutingModule } from './group-routing.module';
import { GroupsComponent } from './groups.component';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MaterialModule,
    GroupRoutingModule
  ],
  providers: [{provide: GroupService}]
})
export class GroupModule {
}
