import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminPortalComponent } from './super-admin-portal.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminPortalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customers',
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./pages/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'campaigns',
        loadChildren: () =>
          import('./pages/campaigns/campaigns.module').then(
            (m) => m.CampaignsModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./pages/clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./pages/brands/brands.module').then((m) => m.BrandsModule),
      },
      {
        path: 'store',
        loadChildren: () =>
          import('./pages/store/store.module').then((m) => m.StoreModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminPortalRoutingModule {}
