import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports: [LoginFormComponent],
})
export class AuthModule {}
