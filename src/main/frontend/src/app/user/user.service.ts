import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserTeam } from '../user-management/user-team.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private readonly baseUrl = 'api';
  
  private currentUser: string | null = null;
  
  constructor(private http: HttpClient) {}

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


}
