import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss'],
})
export class SharedFormComponent {
  @Input() formConfig: any;
  @Output() formValue: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formConfig'] && this.formConfig) {
      this.initForm();
    }
  }

  initForm() {
    let formGroup: Record<string, any> = {};
    this.formConfig.forms.forEach((form: any) => {
      let controlValidators: Validators[] = [];

      if (form.validations && form.validations.length > 0) {
        form.validations.forEach((validation: any) => {
          if (validation.validator === 'required')
            controlValidators.push(Validators.required);
          if (validation.validator === 'email')
            controlValidators.push(Validators.email);
          if (validation.name === 'pattern')
            controlValidators.push(Validators.pattern(validation.pattern));
        });
      }
      formGroup[form.name] = [form.value || '', controlValidators];
    });

    this.form = this.fb.group(formGroup);
  }

  getErrorMessage(control: any) {
    const formControl = this.form.get(control.name);

    if (!control) {
      return '';
    }

    for (let validation of control.validations) {
      if (formControl?.hasError(validation.validator)) {
        return validation.message;
      }
    }

    return '';
  }

  emitFormValue() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formValue.emit(this.form.value);
  }
}
