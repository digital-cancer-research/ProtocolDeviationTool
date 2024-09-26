import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Team } from 'src/app/core/models/team.model';

/**
 * Service to interact with the visualisation API.
 * Provides methods to retrieve data related to visualisation count metric.
 */
@Injectable({
  providedIn: 'root',
})
export class VisualisationService {
  private baseUrl = '/api/visualisation';

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
    return this.http.get<number>(`${this.baseUrl}/total-rows`, { params });
  }

  /**
  * Retrieves the total number of PDs for a specified team.
  * @param teamId - The ID of the team for which to retrieve the PD count.
  * @returns An Observable emitting the total number of PDs for the team.
  */
  getPDsForTeam(teamId: number): Observable<number> {
    const params = new HttpParams().set('teamId', teamId);
    return this.http.get<number>(`${this.baseUrl}/total-pds`, { params });
  }

  /**
  * Retrieves the total number of PDs for the team currently selected by the user.
  * Subscribes to the current user's selected team to determine the team ID from UserService.
  * @returns An Observable emitting the total number of PDs for the currently selected team.
  */
  getPDsForCurrentTeam(): Observable<number> {
    return this.userService.currentUserSelectedTeam$.pipe(
      switchMap((team: Team | null) => {
        if (team) {
          return this.getPDsForTeam(team.teamId).pipe(
            catchError((error) => throwError(() => new Error(error)))
          );
        } else {
          return throwError(() => new Error("No team selected for the current user."));
        }
      }),
      catchError((error) => throwError(() => new Error(error)))
    );
  }
}
