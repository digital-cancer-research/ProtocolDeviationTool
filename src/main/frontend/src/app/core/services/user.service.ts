import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';

/**
 * Service for managing user data.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected readonly baseUrl = 'api';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(protected http: HttpClient) { }

  /**
   * Sets the current user.
   * @param {User} user - The user to set as the current user.
   */
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  /**
   * Retrieves the list of users.
   * @returns {Observable<User[]>} An observable containing the list of users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} userId - The ID of the user.
   * @returns {Observable<User>} An observable containing the user data.
   */
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/user?userId=${userId}`);
  }

  /**
   * Retrieves a user by their username.
   * @param {string} username - The username of the user.
   * @returns {Observable<User>} An observable containing the user data.
   */
  getUserByUsername(username: string): Observable<User> {
    return this.getUserIdByUsername(username).pipe(
      switchMap(userId => this.getUserById(userId))
    );
  }

  /**
   * Retrieves the ID of a user by their username.
   * @param {string} username - The username of the user.
   * @returns {Observable<number>} An observable containing the user ID.
   */
  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/user-id?username=${username}`);
  }

  /**
   * Retrieves the teams of the current user.
   * @returns {Observable<Team>} An observable containing the user's teams.
   */
  getCurrentUserTeams(): Observable<Team[]> {
    return (this.currentUser$.pipe(
      map(user => user?.teams ?? [])
    ))
  }

  /**
   * Retrieves the selected team of the currently logged-in user.
   * @returns {Observable<Team | null>} An observable containing the selected team or null if no team is selected.
   */
  getCurrentUserSelectedTeam(): Observable<Team | null> {
    return this.currentUser$.pipe(
      map(user => user?.selectedTeam ?? null)
    );
  }

  /**
   * Checks if the current user is part of multiple teams.
   * @returns {Observable<boolean | null>} An observable emitting a boolean indicating whether the user is part of multiple teams,
   * or null if no user is set.
   */
  isCurrentUserPartOfMultipleTeams(): Observable<boolean | null> {
    return this.currentUser$.pipe(
      map(user => user ? user.teams.length > 1 : null)
    );
  }
}
