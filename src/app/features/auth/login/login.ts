
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/Services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          username: 'emilys',
          password: 'emilyspass',
        })
        .subscribe({
          next: (data: {
            accessToken: string;
            refreshToken: string;
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            gender: 'male' | 'female' | 'other';
            image: string;
          }) => {
            this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
              panelClass: ['snack-success'],
            });
            this.router.navigateByUrl('/dashboard')
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
          },
        });
    }
  }
}
