import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import { UserWithRoles } from './models/user-with-roles.model';
import { Role } from './models/role.model';
import { UserManagementData } from './models/user-management-data.model';
import { UserTeam } from 'src/app/core/models/user-team.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly baseUrl = 'api/users';

  constructor(private http: HttpClient) { }

  get usersWithRoles$(): Observable<UserWithRoles[]> {
    // Make an HTTP GET request to fetch users with roles
    return this.http.get<UserWithRoles[]>(`${this.baseUrl}/get-users-with-roles`);
  }

  get userTeams$(): Observable<UserTeam[]> {
    // Make an HTTP GET request to fetch user with teams
    return this.http.get<UserTeam[]>(`${this.baseUrl}/get-user-teams`);
  }

  get teams$(): Observable<Team[]> {
    // Make an HTTP GET request to fetch teams
    return this.http.get<Team[]>(`${this.baseUrl}/get-teams`);
  }

  get roles$(): Observable<Role[]> {
    // Make an HTTP GET request to fetch roles
    return this.http.get<Role[]>(`${this.baseUrl}/get-roles`);
  }

  changeUserRole(userId: number, newRoleId: number): Observable<void> {
    // Make an HTTP POST request to change a user's role
    return this.http.post<void>(`${this.baseUrl}/change-user-role/${userId}`, { newRoleId });
  }

  changeUserTeam(newUserTeam: UserTeam): Observable<void> {
    // Make an HTTP POST request to change a user's team
    return this.http.post<void>(`${this.baseUrl}/change-user-team`, newUserTeam);
  }

  // addUserWithRoleTeam(newUser: UserAccount): Observable<void> {
  //   // Make an HTTP POST request to create a new user with role and teams
  //   return this.http.post<void>(`${this.baseUrl}/add-user-with-role-team`, newUser);
  // }

  get userManagementData$(): Observable<UserManagementData[]> {
    return combineLatest([this.usersWithRoles$, this.userTeams$]).pipe(
      map(([users, userTeams]) => {
        return users.map((user: UserWithRoles) => {
          let teams = userTeams.filter((userTeam) => {
            return userTeam.userId == user.userId
          }).map((userTeam) => {
            return {
              teamId: userTeam.teamId,
              teamName: userTeam.teamName
            };
          })
          return {
            ...user,
            teams: teams,
            isEdited: false
          } as UserManagementData;
        });
      })
    );
  }

  get roleNames$(): Observable<string[]> {
    return of(['Admin', 'User', 'Inactive'])
  }
}
