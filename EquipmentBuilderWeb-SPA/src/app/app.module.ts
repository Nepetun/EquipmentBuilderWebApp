import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { EquipmentComponent } from './equipment/equipment.component';
import { AllEquipmentsComponent } from './allEquipments/allEquipments.component';
import { GroupsComponent } from './groups/groups.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MyEquipmentsComponent } from './myEquipments/myEquipments.component';
import { ProfileUserComponent } from './profileUser/profileUser.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      EquipmentComponent,
      AllEquipmentsComponent,
      GroupsComponent,
      MyEquipmentsComponent,
      ProfileUserComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      //AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
