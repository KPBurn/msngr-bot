import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpsertClientComponent } from './upsert-client/upsert-client.component';

@NgModule({
  declarations: [ClientsComponent, UpsertClientComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
})
export class ClientsModule {}
