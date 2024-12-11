import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: 'client/login',
        // redirectTo: 'super-admin/login',
        pathMatch: 'full',
      },
      {
        path: 'client/login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'super-admin/login',
        loadChildren: () =>
          import('./pages/super-admin-login/super-admin-login.module').then(
            (m) => m.SuperAdminLoginModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
