import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from './user-account.model';
import { UserTeam } from './user-team.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly baseUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getUsersWithRoles(): Observable<any[]> {
    // Make an HTTP GET request to fetch users with roles
    return this.http.get<any[]>(`${this.baseUrl}/get-users-with-roles`);
  }
  
  getUserTeams(): Observable<any[]> {
    // Make an HTTP GET request to fetch user with teams
    return this.http.get<any[]>(`${this.baseUrl}/get-user-teams`);
    }
  
  getTeams(): Observable<any[]> {
    // Make an HTTP GET request to fetch teams
    return this.http.get<any[]>(`${this.baseUrl}/get-teams`);
    }
  
  getRoles(): Observable<any[]> {
    // Make an HTTP GET request to fetch roles
    return this.http.get<any[]>(`${this.baseUrl}/get-roles`);
    }

  changeUserRole(userId: number, newRoleId: number): Observable<void> {
	    // Make an HTTP POST request to change a user's role
	    return this.http.post<void>(`${this.baseUrl}/change-user-role/${userId}`, { newRoleId });
  }
  
  changeUserTeam(newUserTeam: UserTeam): Observable<void> {
    // Make an HTTP POST request to change a user's team
    return this.http.post<void>(`${this.baseUrl}/change-user-team`, newUserTeam);
  }
	  
  addUserWithRoleTeam(newUser: UserAccount): Observable<void> {
	  // Make an HTTP POST request to create a new user with role and teams
	  return this.http.post<void>(`${this.baseUrl}/add-user-with-role-team`, newUser);
	}

}
