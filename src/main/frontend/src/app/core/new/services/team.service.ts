import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Team } from './models/team/team.model';
import { TeamWithDetails } from './models/team/team-with-details.model';
import { TeamUpdate } from './models/team/team-update.model';
import { TeamCreate } from './models/team/team-create.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly BASE_URL = 'api/teams';
  private readonly http = inject(HttpClient);
  currentTeamSubject = new BehaviorSubject<Team | null>(this.getTeam());
  currentTeam$ = this.currentTeamSubject.asObservable();

  /**
   * Defines a custom method to be called when the team is set for `currentTeamSubject`,
   * saving it to sessionStorage.
   */
  constructor() {
    const originalNext = this.currentTeamSubject.next.bind(this.currentTeamSubject);
    this.currentTeamSubject.next = (team: Team | null) => {
      this.setTeam(team);
      originalNext(team);
    };
  }

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
  private setTeam(team: Team | null): void {
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
  public getTeams$(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.BASE_URL}`);
  }

  public getTeamsWithDetails$(): Observable<TeamWithDetails[]> {
    const params = new HttpParams().set('includeDetails', true);
    return this.http.get<TeamWithDetails[]>(`${this.BASE_URL}`, { params });
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

  public createTeam$(team: TeamCreate) {
    return this.http.post<Team>(`${this.BASE_URL}`, team);
  }

  public updateTeam$(team: TeamUpdate) {
    return this.http.put<Team>(`${this.BASE_URL}/${team.teamId}`, team);
  }

  public deleteTeam$(teamId: number, adminId: number) {
    return this.http.delete<void>(`${this.BASE_URL}/${teamId}?adminId=${adminId}`);
  }
}