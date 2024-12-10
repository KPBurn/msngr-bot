import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminLoginRoutingModule } from './super-admin-login-routing.module';
import { SuperAdminLoginComponent } from './super-admin-login.component';


@NgModule({
  declarations: [
    SuperAdminLoginComponent
  ],
  imports: [
    CommonModule,
    SuperAdminLoginRoutingModule
  ]
})
export class SuperAdminLoginModule { }
