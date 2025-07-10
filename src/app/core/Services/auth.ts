import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private client: HttpClient) {}

  login(loginBody: {
    username: string;
    password: string;
    expiresInMins?: number;
  }): Observable<{
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other'; // adjust if needed
    image: string;
  }> {
    return this.client.post<{
      accessToken: string;
      refreshToken: string;
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: 'male' | 'female' | 'other';
      image: string;
    }>(`https://dummyjson.com/auth/login`, loginBody);
  }

   signup(data: {email: string, password: string}): Observable<any> {
    return this.client.post('http://localhost:3000/users', data);
  }
}
