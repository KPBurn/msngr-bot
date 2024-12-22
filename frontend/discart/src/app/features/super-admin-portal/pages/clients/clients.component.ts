import { Component, OnInit } from '@angular/core';
import { ClientFormStructure } from 'src/app/shared/models/myClientsform.interface';
import { MatDialog } from '@angular/material/dialog';
import { clientFormConfig } from './upsert-client-dialog/upsert-client-config';
import { UpsertClientDialogComponent } from './upsert-client-dialog/upsert-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clientFormConfig: ClientFormStructure = clientFormConfig;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  upsertClientDialog(data?: any) {
    const dialogRef = this.dialog.open(UpsertClientDialogComponent, {
      disableClose: true,
      width: '28%',
      maxHeight: '750px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }
}
