import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [AlertDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AlertDialogComponent, CommonModule, MaterialModule],
})
export class AlertDialogModule {}
