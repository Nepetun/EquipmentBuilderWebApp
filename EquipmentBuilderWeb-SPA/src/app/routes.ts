import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { GroupsComponent } from './groups/groups.component';
// import { EquipmentComponent } from './my-equipments/equipment/equipment.component';
import { MyEquipmentsComponent } from './my-equipments/my-equipments.component';
import { ProfileUserComponent } from './profileUser/profileUser.component';
import { AuthGuard } from './_guards/auth.guard';
import { MyGroupsComponent } from './my-groups/my-groups.component';
// import { MyGroupsComponent } from './my-groups/my-groups.component';

// kolejność jest ważna - leci po koleji od góry - dlatego wildcard na dole
// zdefiniowanie dummy route - pozwalającego na hierarchię oraz na pojedyńcze wykorzystanie authGuarda
export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    {
        path: '', // ze względu na to, że path = '' routowanie będzie szło bezpośrednio do kolejnych path -
        // jak byśmy dali np 'x' to było by szukanie xgroups
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
           //{ path: 'groups', loadChildren: () => import('./groups/group.module').then(m => m.GroupModule) },

            { path: 'profileUser', component: ProfileUserComponent },

            { path: 'myEquipments', component: MyEquipmentsComponent },
            { path: 'equipment', loadChildren: () => import('./my-equipments/equipment/equipment.module').then(m => m.EquipmentModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'equipmentEditor', loadChildren: () => import('./my-equipments/equipment-editor/equipment-editor.module').then(m => m.EquipmentEditorModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'equipmentReview', loadChildren: () => import('./my-equipments/equipment-review/equipment-review.module').then(m => m.EquipmentReviewModule) },

            // { path: 'myGroups', loadChildren: () => import('./my-groups/my-groups.module').then(m => m.MyGroupsModule) }
            { path: 'myGroups' , component: MyGroupsComponent},
            { path: 'groups', loadChildren: () => import('./my-groups/groups/group.module').then(m => m.GroupModule) }
        ]
    },
    { path: '**' , redirectTo: '', pathMatch: 'full'},
];
