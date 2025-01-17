import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './models/team.model';
import { TeamWithDetails } from './models/team-with-details.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly BASE_URL = 'api/teams';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves the team from session storage.
   * 
   * @returns The team object if present in session storage, otherwise null.
   */
  public getTeam(): Team | null {
    const teamJson = sessionStorage.getItem('team');
    if (teamJson !== null) {
      return JSON.parse(teamJson);
    } else {
      return null;
    }
  }

  /**
   * Stores the team in session storage.
   * 
   * @param team - The team object to store in session storage.
   */
  public setUser(team: Team): void {
    sessionStorage.setItem('team', JSON.stringify(team));
  }

  /**
   * Retrieves a list of teams from the server.
   * 
   * @param includeDetails - A boolean flag indicating whether to include additional details for each team.
   *                         If true, more comprehensive team information will be fetched.
   *                         Defaults to false.
   * @returns An Observable that emits an array of Team or TeamWithDetails objects.
   */
  public getTeams$(includeDetails: boolean = false): Observable<Team[] | TeamWithDetails[]> {
    const params = new HttpParams().set('includeDetails', includeDetails);
    return this.http.get<Team[] | TeamWithDetails[]>(`${this.BASE_URL}`, { params });
  }

  /**
   * Retrieves a team by its ID from the server.
   *
   * @param teamId - The unique identifier of the team to retrieve.
   * @param includeDetails - A boolean flag indicating whether to include additional details for the team.
   *                         If true, more comprehensive team information will be fetched.
   * @returns An Observable that emits the Team or TeamWithDetails object with the specified ID.
   */
  public getTeamById$(teamId: number, includeDetails: boolean): Observable<Team | TeamWithDetails> {
    const params = new HttpParams().set('includeDetails', includeDetails);
    return this.http.get<Team | TeamWithDetails>(`${this.BASE_URL}/${teamId}`, { params });
  }

}
