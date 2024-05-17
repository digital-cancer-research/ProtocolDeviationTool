import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamManagementService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  
  getTeams(): Observable<any[]> {
    // Make an HTTP GET request to fetch teams
    return this.http.get<any[]>(`${this.baseUrl}/get-teams-with-username`);
    }
  
  addTeam(newTeam: Team): Observable<void> {
	  // Make an HTTP POST request to create a new team
	  return this.http.post<void>(`${this.baseUrl}/create-new-team`, newTeam);
	}
  
  deleteTeam(teamId: number): Observable<void> {
	  // Make an HTTP POST request to delete a team
	  return this.http.post<void>(`${this.baseUrl}/delete-team/${teamId}`, {});
	}

  
  changeTeamName(teamId: number, newTeamName: string): Observable<void> {
		 // Make an HTTP POST request to change the team name
	  return this.http.post<void>(`${this.baseUrl}/change-team-name/${teamId}`, newTeamName);
	}


}