import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../../../core/Services/users';
import { User } from '../../../core/Models/interfaces/User';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss'
})
export class UserEdit {
 userForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: Users,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.userService.getUser(this.userId).subscribe((user: User) => {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
        this.snackbar.open('User updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/users']);
      });
    }
  }
}
