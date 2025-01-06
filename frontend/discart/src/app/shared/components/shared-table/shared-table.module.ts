import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTableComponent } from './shared-table.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [SharedTableComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SharedTableComponent, CommonModule, MaterialModule],
})
export class SharedTableModule {}
