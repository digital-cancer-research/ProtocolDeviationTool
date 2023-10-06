import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from './user-account.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsersWithRoles(): Observable<any[]> {
    // Make an HTTP GET request to fetch users with roles
    return this.http.get<any[]>(`${this.baseUrl}/get-users-with-roles`);
  }

  changeUserRole(userId: number, newRoleId: number): Observable<void> {
    // Make an HTTP POST request to change a user's role
    return this.http.post<void>(`${this.baseUrl}/change-user-role/${userId}`, { newRoleId });
  }
  
  addUserWithRole(newUser: UserAccount): Observable<void> {
    // Make an HTTP POST request to create a new user with a role
    return this.http.post<void>(`${this.baseUrl}/add-user-with-role`, newUser);
  }
}
