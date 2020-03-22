import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AllEquipmentsComponent } from './allEquipments/allEquipments.component';
import { MyEquipmentsComponent } from './my-equipments/my-equipments.component';
import { ProfileUserComponent } from './profileUser/profileUser.component';
import { AuthGuard } from './_guards/auth.guard';

// kolejność jest ważna - leci po koleji od góry - dlatego wildcard na dole
// zdefiniowanie dummy route - pozwalającego na hierarchię oraz na pojedyńcze wykorzystanie authGuarda
export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: 'myEquipments',
        loadChildren: () => import('./my-equipments/my-equipments.module').then(m => m.MyEquipmentsModule) //lazy loading 
    },
    {
        path: '', // ze względu na to, że path = '' routowanie będzie szło bezpośrednio do kolejnych path -
        // jak byśmy dali np 'x' to było by szukanie xgroups
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'groups', component: GroupsComponent },
            { path: 'equipment', component: EquipmentComponent },
            { path: 'allEquipments', component: AllEquipmentsComponent },
           // { path: 'myEquipments', component: MyEquipmentsComponent },
            { path: 'profileUser', component: ProfileUserComponent },
        ]
    },
    { path: '**' , redirectTo: '', pathMatch: 'full'},
];
