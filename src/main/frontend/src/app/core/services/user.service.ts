import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';
import { UserTeam } from '../models/user-team.model';

/**
 * Service for managing user data.
 * @class
 * @deprecated
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected readonly baseUrl = 'api';

  currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  currentUserSelectedTeamSubject = new BehaviorSubject<Team | null>(null);
  currentUserSelectedTeam$ = this.currentUserSelectedTeamSubject.asObservable();

  constructor(protected http: HttpClient) { }

  /**
   * Sets the current user.
   * @param {User} user - The user to set as the current user.
   */
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  /**
   * Sets the current user team.
   * @param {Team} team - The team to set as the current user team.
   */
  setCurrentUserSelectedTeam(team: Team | null): void {
    this.currentUserSelectedTeamSubject.next(team);
  }

  /**
   * Retrieves the list of users.
   * @returns {Observable<User[]>} An observable containing the list of users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  /**
   * Retrieves the list of users.
   * @returns {Observable<User[]>} An observable containing the list of users.
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/user`);
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} userId - The ID of the user.
   * @returns {Observable<User>} An observable containing the user data.
   */
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  /**
   * Retrieves a user by their username.
   * @param {string} username - The username of the user.
   * @returns {Observable<User>} An observable containing the user data.
   */
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/username=${username}`);
  }

  /**
   * Retrieves the ID of a user by their username.
   * @param {string} username - The username of the user.
   * @returns {Observable<number>} An observable containing the user ID.
   */
  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users?user-id?username=${username}`);
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

  /**
   * Returns all user team connections.
   * @returns {Observable<UserTeam[]>} An observable containing all user teams.
   */
  getAllUserTeams(): Observable<UserTeam[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/get-user-teams`);
  }

  getUserTeamsByUserId(userId: number): Observable<UserTeam[]> {
    return this.getAllUserTeams().pipe(
      map(userTeams => userTeams.filter(userTeam => userTeam.userId === userId))
    );
  }

  /**
   * Retrieves the teams of the current user.
   * @returns {Observable<Team>} An observable containing the user's teams.
   */
  getCurrentUserTeams(): Observable<Team[]> {
    return this.currentUser$.pipe(
      filter(user => user !== null),
      switchMap(user => this.getUserTeamsByUserId((user as User).userId)),
      map(userTeams => userTeams.map(userTeam => ({
        teamId: userTeam.teamId,
        teamName: userTeam.teamName
      } as Team)))
    );
  }
}
