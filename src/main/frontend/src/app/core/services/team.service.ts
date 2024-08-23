import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Team } from '../models/team.model';

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

  constructor(private http: HttpClient) {
    this.getTeams();
  }

  /**
   * Retrieves a list of teams.
   * @returns An observable of the array of teams.
   */
  private getTeams(): void {
    this.http.get<Team[]>(`${this.baseUrl}/get-teams-with-username`)
      .subscribe(teams => this.teamsSubject.next(teams));
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
}
