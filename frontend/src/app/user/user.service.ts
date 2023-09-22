import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private readonly baseUrl = 'http://localhost:8080/api';
  
  private currentUser: string | null = null;
  

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // Make an HTTP GET request to fetch the list of users from your backend API
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getCurrentUser(): string | null {
  return this.currentUser;
  }
  
  setCurrentUser(username: string): void {
  this.currentUser = username;
  localStorage.setItem('currentUser', username);
  }

}
