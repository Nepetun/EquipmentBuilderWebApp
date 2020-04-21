import { BrowserModule } from '@angular/platform-browser';
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
import { EquipmentComponent } from './equipment/equipment.component';
// import { AllEquipmentsComponent } from './allEquipments/allEquipments.component';
import { GroupsComponent } from './groups/groups.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MyEquipmentsComponent } from './my-equipments/my-equipments.component';
import { ProfileUserComponent } from './profileUser/profileUser.component';
import { MyEquipmentsModule } from './my-equipments/my-equipments.module';
import { MaterialModule } from './material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyGroupsComponent } from './my-groups/my-groups.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      /*EquipmentComponent,
      //AllEquipmentsComponent,
      GroupsComponent,
      //MyEquipmentsComponent,
      ProfileUserComponent*/
      MyGroupsComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      HttpClientModule,
      //BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes)
      // MyEquipmentsModule // import modułu odpowiedzialnego za wyświetlanie ekwipunku
    ],
    providers: [
       //AuthService,
       ErrorInterceptorProvider,
       {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
