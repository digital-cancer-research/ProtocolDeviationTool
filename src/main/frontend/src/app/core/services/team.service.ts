import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamWithStudies } from '../models/team-with-studies.model';

/**
 * Service for managing teams.
 * Provides methods to retrieve, add, delete, and update teams.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  public teams$: Observable<Team[]> = this.teamsSubject.asObservable();
  private readonly baseUrl = 'api/users';
  private readonly apiUrl = 'api/teams';

  constructor(private http: HttpClient) {
    this.getTeams();
  }

  /**
   * Retrieves a list of teams.
   */
  private getTeams(): void {
    this.http.get<Team[]>(`${this.baseUrl}/get-teams-with-username`)
      .subscribe(teams => {
        console.log(teams);
        this.teamsSubject.next(teams)});
  }

  /**
   * Adds a new team.
   * @param newTeam The team to be added.
   * @returns {Observable<HttpResponse<any>>} Observable Http Response.
   */
  addTeam(newTeam: Team): Observable<HttpResponse<any>> {
    return this.http.post<void>(`${this.baseUrl}/create-new-team`, newTeam,
      { observe: 'response' })
      .pipe(
        tap(() => {
          this.getTeams();
        }))
  }

  /**
   * Deletes a team by its ID.
   * @param teamId The ID of the team to be deleted.
   * @returns {Observable<HttpResponse<any>>} Observable Http Response.
   */
  deleteTeam(teamId: number): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/delete-team/${teamId}`, {},
      { observe: 'response' })
      .pipe(
        tap(() => {
          this.getTeams();
        }));
  }

  /**
   * Changes the name of a team.
   * @param teamId The ID of the team to be updated.
   * @param newTeamName The new name for the team.
   * @returns {Observable<HttpResponse<any>>} Observable Http Response.
   */
  changeTeamName(teamId: number, newTeamName: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/change-team-name/${teamId}`, newTeamName,
      { observe: 'response' })
      .pipe(
        tap(() => {
          this.getTeams();
        }));
  }

  /**
  * Retrieves team study access information for the given team IDs.
  * 
  * @param teamIds - Array of team IDs to fetch study access information for.
  * @returns An Observable of an array of TeamWithStudies objects.
  */
  getTeamStudyAccess(teamIds: number[]): Observable<TeamWithStudies[]> {
    let params = new HttpParams();
    teamIds.forEach(id => params = params.append('teamIds', id.toString()));
    return this.http.get<TeamWithStudies[]>(`${this.apiUrl}/team-study-access`, { params });
  }

  // updateTeamStudyAccess(teamWithStudiesArray: TeamWithStudies[]) {
  //   console.log("Posting");
  //   return this.http.get<void>(`${this.apiUrl}/team-study-access`, teamWithStudiesArray);
  // }

  updateTeamStudyAccess(teamWithStudiesArray: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/team-study-access`, teamWithStudiesArray);
  }
}