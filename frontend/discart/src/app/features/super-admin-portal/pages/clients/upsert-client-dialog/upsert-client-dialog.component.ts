import { Component, ViewChild } from '@angular/core';
import { SharedFormComponent } from 'src/app/shared/components/shared-form/shared-form.component';
import { ClientFormStructure } from 'src/app/shared/models/myClientsform.interface';
import { clientFormConfig } from './upsert-client-config';

@Component({
  selector: 'app-upsert-client-dialog',
  templateUrl: './upsert-client-dialog.component.html',
  styleUrls: ['./upsert-client-dialog.component.scss'],
})
export class UpsertClientDialogComponent {
  @ViewChild(SharedFormComponent) sharedFormComponent!: SharedFormComponent;

  clientFormConfig: ClientFormStructure = clientFormConfig;

  constructor() {}

  ngOnInit(): void {}

  formValue(formData: any) {
    console.log('Form data from shared form component:', formData);
  }

  handleSubmit() {
    this.sharedFormComponent.emitFormValue();
  }
}
