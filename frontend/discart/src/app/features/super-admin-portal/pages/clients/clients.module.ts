import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpsertClientDialogComponent } from './upsert-client-dialog/upsert-client-dialog.component';

@NgModule({
  declarations: [ClientsComponent, UpsertClientDialogComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
})
export class ClientsModule {}
