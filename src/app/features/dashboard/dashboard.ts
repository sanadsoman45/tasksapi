import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DashboardService } from '../../core/Services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  totalUsers = 0;
  activeUsers = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe((users) => {
      this.totalUsers = users.length;
      this.activeUsers = users.filter((u, i) => i % 2 === 0).length;
    });
  }
}
