import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminPortalRoutingModule } from './super-admin-portal-routing.module';
import { SuperAdminPortalComponent } from './super-admin-portal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SuperAdminPortalComponent],
  imports: [CommonModule, SuperAdminPortalRoutingModule, SharedModule],
})
export class SuperAdminPortalModule {}
