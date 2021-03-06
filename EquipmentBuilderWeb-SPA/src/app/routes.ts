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
    { path: '',  component: HomeComponent, pathMatch: 'full'},
    {
        path: '', // ze względu na to, że path = '' routowanie będzie szło bezpośrednio do kolejnych path -
        // jak byśmy dali np 'x' to było by szukanie xgroups
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'manageAdminUsers', loadChildren: () => import('./userManagementAdmin/userManagementAdmin.module').then(m => m.UserManagementAdminModule) },
            { path: 'userManagementPasswordReset', loadChildren: () => import('./userManagementAdmin/userManagementPasswordReset/userManagementPasswordReset.module').then(m => m.UserManagementPasswordResetModule) },


            { path: 'manageAdminItems', loadChildren: () => import('./itemManagementAdmin/itemManagementAdmin.module').then(m => m.ItemManagementAdminModule) },
            { path: 'itemEditor', loadChildren: () => import('./itemManagementAdmin/itemEditorAdmin/itemEditorAdmin.module').then(m => m.ItemEditorAdminModule) },
            { path: 'itemCreator', loadChildren: () => import('./itemManagementAdmin/itemCreatorAdmin/itemCreatorAdmin.module').then(m => m.ItemCreatorAdminModule) },

            { path: 'manageAdminHeroes', loadChildren: () => import('./heroesManagementAdmin/heroesManagementAdmin.module').then(m => m.HeroesManagementModule) },
            { path: 'heroesEditorAdmin', loadChildren: () => import('./heroesManagementAdmin/heroesEditorAdmin/heroesEditorAdmin.module').then(m => m.HeroesEditorAdminModule) },
            { path: 'heroesCreatorAdmin', loadChildren: () => import('./heroesManagementAdmin/heroesCreatorAdmin/heroesCreatorAdmin.module').then(m => m.HeroesCreatorAdminModule) },
            
            
            { path: 'manageAdminGames', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
            { path: 'adminGamesCreator', loadChildren: () => import('./games/gameCreator/gameCreator.module').then(m => m.GameCreatorModule) },
            
            { path: 'profileUser', loadChildren: () => import('./profileUser/profileUser.module').then(m => m.ProfileUserModule) },

            { path: 'myEquipments', component: MyEquipmentsComponent },
            { path: 'equipment', loadChildren: () => import('./my-equipments/equipment/equipment.module').then(m => m.EquipmentModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'equipmentEditor', loadChildren: () => import('./my-equipments/equipment-editor/equipment-editor.module').then(m => m.EquipmentEditorModule) },
            // tslint:disable-next-line: max-line-length
            { path: 'equipmentReview', loadChildren: () => import('./my-equipments/equipment-review/equipment-review.module').then(m => m.EquipmentReviewModule) },
            { path: 'equipmentShare', loadChildren: () => import('./my-equipments/equipment-share/equipment-share.module').then(m => m.EquipmentShareModule) },

            { path: 'myGroups' , component: MyGroupsComponent},
            { path: 'groups', loadChildren: () => import('./my-groups/groups/group.module').then(m => m.GroupModule) },
            { path: 'groupEditor', loadChildren: () => import('./my-groups/group-editor/group-editor.module').then(m => m.GroupEditorModule) },

            { path: 'manageUsers', loadChildren: () => import('./my-groups/group-user-management/group-user-management.module').then(m => m.GroupUserManagementModule) },
            { path: 'groupPreview', loadChildren: () => import('./my-groups/group-user-preview/group-user-preview.module').then(m => m.GroupUserPreviewModule) },
            { path: 'invitationManagement', loadChildren: () => import('./my-groups/group-invitation-management/group-invitation-management.module').then(m => m.GroupInvitationManagementModule) }
        ]
    },
    { path: '**' , redirectTo: 'home', pathMatch: 'full'},
];
