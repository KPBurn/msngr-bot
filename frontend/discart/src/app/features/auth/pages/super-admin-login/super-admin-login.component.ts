import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.scss'],
})
export class SuperAdminLoginComponent {
  loginFormGroup!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['client'],
    });
  }

  onSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      console.log(this.loginFormGroup.value);
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
