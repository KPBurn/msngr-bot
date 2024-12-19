import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientFormStructure } from 'src/app/shared/interface/shared-form.interface';
import { SharedFormComponent } from 'src/app/shared/components/shared-form/shared-form.component';
import { MatDialog } from '@angular/material/dialog';
import { clientFormConfig } from './upsert-client-dialog/upsert-client-config';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  @ViewChild(SharedFormComponent) sharedFormComponent!: SharedFormComponent;

  clientFormConfig: ClientFormStructure = clientFormConfig;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  formValue(formData: any) {
    console.log('Form data received from child:', formData);
  }

  handleSubmit() {
    this.sharedFormComponent.emitFormValue();
  }

  upsertClientDialog(data?: any) {}
}
