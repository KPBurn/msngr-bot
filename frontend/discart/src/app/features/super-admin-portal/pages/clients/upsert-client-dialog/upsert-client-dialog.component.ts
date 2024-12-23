import { Component, ViewChild } from '@angular/core';
import { SharedFormComponent } from 'src/app/shared/components/shared-form/shared-form.component';
import { myClientForm } from 'src/app/shared/models/myClientform.interface';
import { myClientFormConfig } from './upsert-client-config';
import { myClient } from 'src/app/shared/models/myClient.interface';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-upsert-client-dialog',
  templateUrl: './upsert-client-dialog.component.html',
  styleUrls: ['./upsert-client-dialog.component.scss'],
})
export class UpsertClientDialogComponent {
  @ViewChild(SharedFormComponent) myClientForm!: SharedFormComponent;

  myClientFormConfig: myClientForm = myClientFormConfig;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  formValue(formData: myClient) {
    console.log('Form data from shared form component:', formData);
  }

  handleSubmit() {
    this.myClientForm.emitFormValue();
    console.log(this.myClientForm.form.invalid);
    // this.alertDialog();
  }

  alertDialog() {
    this.dialog.open(AlertDialogComponent);
  }
}
