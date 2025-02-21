import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Team } from '../models/team/team.model';
import { TeamCreation } from '../models/team/team-creation.model';
import { TeamWithDetails } from '../models/team/team-with-details.model';
import { ActivatedRoute } from '@angular/router';

/**
 * Service for managing teams.
 * Provides methods to retrieve, add, delete, and update teams.
 * @class
 * @deprecated
 */
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly URL = 'api/teams';

  private readonly route = inject(ActivatedRoute);

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of teams from the server.
   * 
   * @param includeDetails - A boolean flag indicating whether to include additional details for each team.
   *                         If true, more comprehensive team information will be fetched.
   *                         Defaults to false.
   * @returns void - This method does not return a value. It likely updates an internal state or triggers a subscription.
   */
  getTeams$(includeDetails: boolean = false): Observable<Team[] | TeamWithDetails[] | TeamWithDetails[]> {
    const params = new HttpParams().set('includeDetails', includeDetails);
    return this.http.get<Team[] | TeamWithDetails[]>(`${this.URL}`, { params })
  }

  /**
   * Adds a new team to the system.
   * 
   * @param newTeam - The team creation data object containing information for the new team.
   * @returns An Observable that emits the newly created Team object upon successful addition.
   */
  addTeam$(newTeam: TeamCreation): Observable<Team | TeamWithDetails> {
    return this.http.post<Team | TeamWithDetails>(`${this.URL}`, newTeam);
  }

  /**
   * Retrieves a team by its ID from the server.
   *
   * @param teamId - The unique identifier of the team to retrieve.
   * @param includeDetails - A boolean flag indicating whether to include additional details for the team.
   *                         If true, more comprehensive team information will be fetched.
   * @returns An Observable that emits the Team object with the specified ID.
   */
  getTeamById$(teamId: number, includeDetails: boolean): Observable<Team | TeamWithDetails> {
    const params = new HttpParams().set('includeDetails', includeDetails);
    return this.http.get<Team | TeamWithDetails>(`${this.URL}/${teamId}`, { params });
  }

  /**
   * Updates an existing team's information in the system.
   * 
   * @param team - The Team object containing updated information.
   *               This object should include the teamId of the team to be updated,
   *               along with any modified properties.
   * @returns An Observable that emits the updated Team object upon successful update.
   *          The emitted Team object reflects the state of the team after the update operation.
   */
  updateTeam$(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.URL}/${team.teamId}`, team);
  }

  /**
   * Deletes a team from the system using its ID.
   *
   * @param teamId - The unique identifier of the team to be deleted.
   * @returns An Observable that completes when the deletion is successful.
   *          The Observable does not emit any value (void) but its completion
   *          indicates that the team has been successfully deleted.
   */
  deleteTeam$(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${teamId}`)
  }

  /**
   * Changes the name of a team in the system.
   * 
   * @param team - The Team object containing the updated team information.
   *               This should include the team's ID and the new name.
   * @returns An Observable that emits the updated Team object.
   *          The emitted Team object reflects the state of the team after the name change.
   */
  changeTeamName$(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.URL}/${team.teamId}`, { team: team })
  }

  /**
   * Updates the study access information for teams.
   * 
   * @param teamWithStudiesArray - An array of objects containing team and study access information.
   * @returns An Observable that completes when the update is successful.
   */
  updateTeamStudyAccess(teamWithStudiesArray: any): Observable<void> {
    return this.http.post<void>(`${this.URL}/team-study-access`, teamWithStudiesArray);
  }

  /**
   * Retrieves the team ID from the route query parameters.
   * 
   * @returns The team ID if present, otherwise null.
   */
  public getTeamIdFromRoute(): number | null {
    const teamId: number | undefined = this.route.snapshot.queryParams['teamId'];
    return teamId ? teamId : null;
  }

  /**
   * Retrieves the team ID from the route query parameters as an observable.
   * 
   * @returns An Observable that emits the team ID if present, otherwise null.
   */
  public getTeamIdFromRoute$(): Observable<number | null> {
    return this.route.queryParams.pipe(
      map(params => {
        const teamId = params['teamId'];
        return teamId ? teamId : null;
      })
    );
  }
  
  /**
   * Fetches the team from the route query parameters.
   * 
   * @param includeDetails - Whether to include detailed information about the team.
   * @returns An Observable that emits the team or team with details if the team ID is present, otherwise null.
   */
  public fetchTeamFromRoute$(includeDetails: boolean): Observable<Team | TeamWithDetails | null> {
    return this.getTeamIdFromRoute$().pipe(
      mergeMap(teamId => {
        if (teamId !== null) {
          return this.getTeamById$(teamId, includeDetails);
        } else {
          return of(null);
        }
      })
    );
  }

}