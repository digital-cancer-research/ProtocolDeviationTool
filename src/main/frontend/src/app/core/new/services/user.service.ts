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

  /**
   * Retrieves the user from session storage.
   * 
   * @returns The user object if present in session storage, otherwise null.
   */
  public getUser(): User | null {
    const userJson = sessionStorage.getItem('user');
    if (userJson !== null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  /**
   * Stores the user in session storage.
   * 
   * @param user - The user object to store in session storage.
   */
  public setUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Retrieves all users from the server.
   * 
   * @returns An Observable that emits an array of User objects.
   */
  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  /**
   * Retrieves a user by their ID from the server.
   * 
   * @param userId - The unique identifier of the user to retrieve.
   * @returns An Observable that emits the User object with the specified ID.
   */
  getUserById$(userId: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${userId}`);
  }

  /**
   * Retrieves a user by their username from the server.
   * 
   * @param username - The username of the user to retrieve.
   * @returns An Observable that emits the User object with the specified username.
   */
  getUserByUsername$(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/username=${username}`);
  }
}
