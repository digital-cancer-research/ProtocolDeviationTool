import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';

/**
 * Service to interact with the visualisation API.
 * Provides methods to retrieve data related to visualisation count metric.
 */
@Injectable({
  providedIn: 'root',
})
export class VisualisationService {
  private apiUrl = '/api/visualisation';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  /**
  * Retrieves the total number of rows from the API.
  * Optionally filters by site ID if provided.
  * @param siteId - Optional site ID to filter results.
  * @returns An Observable emitting the total number of rows.
  */
  getTotalRows(siteId?: string): Observable<number> {
    const params = siteId ? new HttpParams().set('siteId', siteId) : undefined;
    return this.http.get<number>(`${this.apiUrl}/total-rows`, { params });
  }

  /**
  * Retrieves the total number of PDs for a specified team.
  * @param teamId - The ID of the team for which to retrieve the PD count.
  * @returns An Observable emitting the total number of PDs for the team.
  */
  getPDsForTeam(teamId: number) {
    const params = new HttpParams().set('teamId', teamId);
    return this.http.get<number>(`${this.apiUrl}/total-pds`, { params });
  }

  /**
  * Retrieves the total number of PDs for the team currently selected by the user.
  * Subscribes to the current user's selected team to determine the team ID from UserService.
  * @returns An Observable emitting the total number of PDs for the currently selected team.
  */
  getPDsForCurrentTeam() {
    let currentTeamId: number | undefined = undefined;
    this.userService.currentUserSelectedTeam$.subscribe(
      (team) => {
        currentTeamId = team?.teamId;
      }
    )
    const params = currentTeamId ? new HttpParams().set('teamId', currentTeamId) : undefined;
    return this.http.get<number>(`${this.apiUrl}/total-pds`, { params });
  }
}
