import { inject, Injectable } from '@angular/core';
import { User } from './models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Team } from './models/team.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL = 'api/users';
  private readonly http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromSessionStorage());
  private currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Retrieves the user from session storage.
   * 
   * @returns The user object if present in session storage, otherwise null.
   */
  private getUserFromSessionStorage(): User | null {
    const userJson = sessionStorage.getItem('user');
    if (userJson !== null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  /**
   * Returns an observable of the current user.
   * 
   * @returns An Observable that emits the current user.
   */
  getUser$(): Observable<User | null> {
    return this.currentUser$;
  }

  /**
   * Returns the current user.
   * 
   * @returns The current user.
   */
  getUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  /**
   * Stores the user in session storage and updates the current user subject.
   * 
   * @param user - The user object to store in session storage.
   */
  setUser(user: User | null): void {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Retrieves all users from the server.
   * 
   * @returns An Observable that emits an array of User objects.
   */
  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}`);
  }

  /**
   * Retrieves a user by their ID from the server.
   * 
   * @param userId - The unique identifier of the user to retrieve.
   * @returns An Observable that emits the User object with the specified ID.
   */
  getUserById$(userId: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/${userId}`);
  }

  /**
   * Retrieves a user by their username from the server.
   * 
   * @param username - The username of the user to retrieve.
   * @returns An Observable that emits the User object with the specified username.
   */
  getUserByUsername$(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/username=${username}`);
  }

  /**
   * Retrieves the list of teams associated with a user.
   * 
   * @param userId - The ID of the user.
   * @returns An Observable that emits an array of Team objects associated with the user.
   */
  getUserTeams(userId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.BASE_URL}/${userId}/teams`);
  }
}
