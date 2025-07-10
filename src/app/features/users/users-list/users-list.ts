import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../core/Services/users';
import { User } from '../../../core/Models/interfaces/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, RouterModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  dataSource = new MatTableDataSource<User>([]);
  columns = ['name', 'email', 'phone', 'actions'];

  constructor(private userService: Users) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .subscribe((users) => (this.dataSource.data = users));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
