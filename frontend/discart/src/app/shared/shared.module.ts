import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SharedFormModule } from './components/shared-form/shared-form.module';
import { AlertDialogModule } from './components/alert-dialog/alert-dialog.module';
import { SharedTableModule } from './components/shared-table/shared-table.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedFormModule,
    AlertDialogModule,
    SharedTableModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedFormModule,
    AlertDialogModule,
    SharedTableModule,
  ],
})
export class SharedModule {}
