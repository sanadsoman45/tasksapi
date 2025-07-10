import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../../core/Services/users';
import { User } from '../../../core/Models/interfaces/User';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  user!: User;

  constructor(private route: ActivatedRoute, private userService: Users) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.userService.getUser(id).subscribe((data) => (this.user = data));
  }
}
