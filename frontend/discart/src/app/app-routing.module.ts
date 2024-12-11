import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'client/portal',
  //   loadChildren: () =>
  //     import('./features/client-portal/client-portal.module').then(
  //       (m) => m.ClientPortalModule
  //     ),
  // },
  {
    path: 'super-admin/portal',
    loadChildren: () =>
      import('./features/super-admin-portal/super-admin-portal.module').then(
        (m) => m.SuperAdminPortalModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
