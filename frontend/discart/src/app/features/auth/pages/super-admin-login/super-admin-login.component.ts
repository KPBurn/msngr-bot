import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-login',
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.scss'],
})
export class SuperAdminLoginComponent {
  loginFormGroup!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(6)]],
      userType: ['superAdmin'],
    });
  }

  onSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      console.log(this.loginFormGroup.value);
      console.log('Navigating to customers...');
      this.router.navigate(['/super-admin/portal/customers']);
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
