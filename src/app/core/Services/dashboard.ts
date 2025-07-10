import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private client: HttpClient){

  }

  getDashboard(){
    return this.client.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
  
}
