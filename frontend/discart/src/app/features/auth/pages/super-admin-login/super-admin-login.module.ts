import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminLoginRoutingModule } from './super-admin-login-routing.module';
import { SuperAdminLoginComponent } from './super-admin-login.component';
import { AuthModule } from '../../auth.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SuperAdminLoginComponent],
  imports: [
    CommonModule,
    SuperAdminLoginRoutingModule,
    SharedModule,
    AuthModule,
  ],
})
export class SuperAdminLoginModule {}
