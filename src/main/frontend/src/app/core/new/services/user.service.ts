import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user/user.model';
import { Team } from './models/team/team.model';
import { UserWithTeams } from './models/user/user-with-teams.model';
import { UserUpdateWithTeams } from './models/user/user-update-with-teams.model';
import { UserCreateWithTeams } from './models/user/user-create-with-teams.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL = 'api/users';
  private readonly http = inject(HttpClient);
  currentUserSubject = new BehaviorSubject<User | null>(this.getUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const originalNext = this.currentUserSubject.next.bind(this.currentUserSubject);
    this.currentUserSubject.next = (user: User | null) => {
      this.setUser(user);
      originalNext(user);
    };
  }

  getCurrentUser$(): Observable<User> {
    const user = this.http.get<User>(`${this.BASE_URL}/authenticated-user`);
    return user;
  }

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
  private setUser(user: User | null): void {
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
   * Retrieves all users with their associated teams from the server.
   * 
   * @returns An Observable that emits an array of UserWithTeams objects.
   */
  getUsersWithTeams$(): Observable<UserWithTeams[]> {
    return this.http.get<UserWithTeams[]>(`${this.BASE_URL}/with-teams`);
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
   * Retrieves a user with their associated teams by their ID from the server.
   * 
   * @param userId - The unique identifier of the user to retrieve.
   * @returns An Observable that emits the UserWithTeams object with the specified ID.
   */
  getUserWithTeamsById$(userId: number): Observable<UserWithTeams> {
    return this.http.get<UserWithTeams>(`${this.BASE_URL}/${userId}/with-teams`);
  }

  /**
   * Retrieves the list of teams associated with a user.
   * 
   * @param userId - The ID of the user.
   * @returns An Observable that emits an array of Team objects associated with the user.
   */
  getUserTeams$(userId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.BASE_URL}/${userId}/teams`);
  }

  /**
   * Creates a new user with their associated teams.
   * 
   * @param user - The user object to create.
   * @returns An Observable that emits the created UserWithTeams object.
   */
  createUserWithTeams$(user: UserCreateWithTeams): Observable<UserWithTeams> {
    return this.http.post<UserWithTeams>(`${this.BASE_URL}/with-teams`, user);
  }

  /**
   * Updates an existing user with their associated teams.
   * 
   * @param user - The user object to update.
   * @returns An Observable that emits the updated UserWithTeams object.
   */
  updateUserWithTeams$(user: UserUpdateWithTeams): Observable<UserWithTeams> {
    return this.http.put<UserWithTeams>(`${this.BASE_URL}/${user.id}/with-teams`, user);
  }
}