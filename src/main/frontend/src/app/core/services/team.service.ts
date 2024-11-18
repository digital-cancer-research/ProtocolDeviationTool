import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team/team.model';
import { TeamWithStudies } from '../models/team/team-with-studies.model';
import { TeamCreation } from '../models/team/team-creation.model';
import { TeamWithDetails } from '../models/team/team-with-details.model';

/**
 * Service for managing teams.
 * Provides methods to retrieve, add, delete, and update teams.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly URL = 'api/teams';

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
  updateTeamById$(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.URL}/${team.teamId}`, { team: team });
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
  * Retrieves team study access information for the given team IDs.
  * 
  * @param teamIds - Array of team IDs to fetch study access information for.
  * @returns An Observable of an array of TeamWithStudies objects.
  */
  getTeamStudyAccess(teamIds: number[]): Observable<TeamWithStudies[]> {
    let params = new HttpParams();
    teamIds.forEach(id => params = params.append('teamIds', id.toString()));
    return this.http.get<TeamWithStudies[]>(`${this.URL}/team-study-access`, { params });
  }

  updateTeamStudyAccess(teamWithStudiesArray: any): Observable<void> {
    return this.http.post<void>(`${this.URL}/team-study-access`, teamWithStudiesArray);
  }
}