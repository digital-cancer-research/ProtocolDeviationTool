import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  private readonly baseUrl = 'api/users';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of teams.
   * @returns An observable of the array of teams.
   */
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/get-teams`);
  }

  /**
   * Adds a new team.
   * @param newTeam The team to be added.
   */
  addTeam(newTeam: Team): void {
    this.http.post<void>(`${this.baseUrl}/create-new-team`, newTeam);
  }

  /**
   * Deletes a team by its ID.
   * @param teamId The ID of the team to be deleted.
   */
  deleteTeam(teamId: number): void {
    this.http.post<void>(`${this.baseUrl}/delete-team/${teamId}`, {});
  }

  /**
   * Changes the name of a team.
   * @param teamId The ID of the team to be updated.
   * @param newTeamName The new name for the team.
   */
  changeTeamName(teamId: number, newTeamName: string): void {
    this.http.post<void>(`${this.baseUrl}/change-team-name/${teamId}`, newTeamName);
  }
}
