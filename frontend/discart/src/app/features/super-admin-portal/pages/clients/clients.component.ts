import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientFormStructure } from 'src/app/shared/interface/shared-form.interface';
import { clientFormConfig } from './upsert-client/upsert-client-config';
import { SharedFormComponent } from 'src/app/shared/components/shared-form/shared-form.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  @ViewChild(SharedFormComponent) sharedFormComponent!: SharedFormComponent;

  clientForm: ClientFormStructure = clientFormConfig;

  constructor() {}

  ngOnInit(): void {}

  formValue(formData: any) {
    console.log('Form data received from child:', formData);
  }

  handleSubmit() {
    this.sharedFormComponent.emitFormValue();
  }

  clientModal() {
    console.log('client modal');
  }
}
