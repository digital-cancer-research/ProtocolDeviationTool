import { inject, Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL = 'api/users';
  private readonly http = inject(HttpClient);

  public getUser(): User | null {
    const userJson = sessionStorage.getItem('user');
    if (userJson !== null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  public setUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${userId}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/username=${username}`);
  }
}
