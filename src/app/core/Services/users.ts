import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class Users {

  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  
  constructor(private client: HttpClient){

  }

   getUsers(): Observable<User[]> {
    return this.client.get<User[]>(this.baseUrl);
  }

  getUser(id: number): Observable<User> {
    return this.client.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, data: Partial<User>): Observable<any> {
    return this.client.patch(`${this.baseUrl}/${id}`, data);
  }
}
