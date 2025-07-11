import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateuser',
  imports: [ReactiveFormsModule],
  templateUrl: './updateuser.html',
  styleUrl: './updateuser.scss',
})
export class Updateuser {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private toaster: ToastrService) {
    this.signupForm = this.fb.group(
      {
        email: ['test@gmail.com', [Validators.required, Validators.email]],
        password: [
          'Test@123#',
          [
            Validators.required,
            Validators.minLength(8),
            this.strongPasswordValidator(),
          ],
        ],
        confirmPassword: ['Test@123#', [Validators.required]],
      },
      { validators: [this.passwordMatchValidator] }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };

  strongPasswordValidator(): ValidatorFn {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      return regex.test(value) ? null : { weakPassword: true };
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.toaster.success('Account Update successful!');
    }
  }
}
