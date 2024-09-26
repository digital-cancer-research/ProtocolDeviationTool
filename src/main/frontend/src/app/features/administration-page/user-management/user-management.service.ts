import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable, of, tap } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';
import { UserWithRoles } from './models/user-with-roles.model';
import { Role } from './models/role.model';
import { UserManagementData } from './models/user-management-data.model';
import { UserTeam as CoreUserTeam } from 'src/app/core/models/user-team.model';
import { UserTeam } from './models/user-team.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly baseUrl = 'api/users';
  userManagementDataSubject = new BehaviorSubject<UserManagementData[]>([]);
  userManagementData$ = this.userManagementDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserManagementData();
  }

  get usersWithRoles$(): Observable<UserWithRoles[]> {
    return this.http.get<UserWithRoles[]>(`${this.baseUrl}/get-users-with-roles`);
  }

  get userTeams$(): Observable<CoreUserTeam[]> {
    return this.http.get<CoreUserTeam[]>(`${this.baseUrl}/get-user-teams`);
  }

  get teams$(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/get-teams`);
  }

  get roles$(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/get-roles`);
  }

  changeUserRole(userId: number, newRoleId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/change-user-role/${userId}`, { newRoleId });
  }

  changeUserTeam(newUserTeam: UserTeam): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/change-user-team`, newUserTeam);
  }

  addUserWithRoleTeam(newUser: UserAccount): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add-user-with-role-team`, newUser).pipe(
      tap(() => this.loadUserManagementData())
    );
  }

  private loadUserManagementData(): void {
    combineLatest([this.usersWithRoles$, this.userTeams$])
      .pipe(
        map(([users, userTeams]) => {
          return users.map((user: UserWithRoles) => {
            const teams = userTeams
              .filter((userTeam) => userTeam.userId === user.userId)
              .map((userTeam) => {
                return {
                  teamId: userTeam.teamId,
                  teamName: userTeam.teamName,
                };
              });
            return {
              ...user,
              teams: teams,
              isEdited: false,
              isLoading: false,
            } as UserManagementData;
          });
        })
      )
      .subscribe((data) => this.userManagementDataSubject.next(data));
  }

  get roleNames$(): Observable<string[]> {
    return of(['Admin', 'User', 'Inactive']);
  }

/**
 * Gets the ID for the selected role.
 * 
 * @returns The ID corresponding to the selected role.
 */
  public getRoleId(roleName: string): number {
    switch (roleName) {
      case 'Admin': return 1;
      case 'User': return 2;
      default: return 3;
    }
  }
}

interface UserAccount {
  username: string;
  teamId: number[];
  roleId: number;
}
