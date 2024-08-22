import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { User } from './user.model';
import { UserTeam } from '../features/administration-page/user-management/user-team.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private readonly baseUrl = 'api';

  private currentUser: string | null = null;
  private isUserPartOfMultipleTeamsSubject = new BehaviorSubject<boolean>(false);
  isUserPartOfMultipleTeams$: Observable<boolean> = this.isUserPartOfMultipleTeamsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // Make an HTTP GET request to fetch the list of users
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/users/user-id?username=${username}`);
  }

  //Method to fetch the teams of the current user
  getCurrentUserTeams(userId: number): Observable<UserTeam[]> {
    return this.http.get<UserTeam[]>(`${this.baseUrl}/users/get-current-user-teams?userId=${userId}`);
  }

  setCurrentUser(username: string): Observable<void> {
    this.currentUser = username;
    localStorage.setItem('currentUser', username);
    return this.http.post<void>(`${this.baseUrl}/users/setCurrentUser`, { username });
  }

  checkIfUserIsPartOfMultipleTeams(username: string): Observable<boolean> {
    return this.getUserIdByUsername(username).pipe(
      switchMap((userId) => this.getCurrentUserTeams(userId)),
      map(teams => teams.length > 1),
      tap(isPartOfMultipleTeams => this.isUserPartOfMultipleTeamsSubject.next(isPartOfMultipleTeams))
    );
  }
}
