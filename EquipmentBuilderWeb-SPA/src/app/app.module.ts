import { BrowserModule } from '@angular/platform-browser';
import { ItemManagementAdminComponent } from './itemManagementAdmin/itemManagementAdmin.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { EquipmentComponent } from './my-equipments/equipment/equipment.component';
// import { AllEquipmentsComponent } from './allEquipments/allEquipments.component';
// import { GroupsComponent } from './groups/groups.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MyEquipmentsComponent } from './my-equipments/my-equipments.component';
import { ProfileUserComponent } from './profileUser/profileUser.component';
import { MyEquipmentsModule } from './my-equipments/my-equipments.module';
import { MaterialModule } from './material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MyGroupsModule } from './my-groups/my-groups.module';
import { GamesComponent } from './games/games.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      HttpClientModule,
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes)
    ],
    providers: [
       ErrorInterceptorProvider,
       {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
