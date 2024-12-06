import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../../auth.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, AuthModule],
})
export class LoginModule {
  constructor() {}

  ngOnInit() {
    console.log('CLIENT LOG IN');
  }
}
