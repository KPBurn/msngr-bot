import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormComponent } from './shared-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [SharedFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [SharedFormComponent, ReactiveFormsModule, MaterialModule],
})
export class SharedFormModule {}
