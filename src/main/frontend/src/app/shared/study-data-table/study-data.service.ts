import { Injectable } from '@angular/core';
import { StudyData } from './study-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Service for managing study data retrieval from the API.
 */
@Injectable({
  providedIn: 'root'
})
export class StudyDataService {

  /** Array to hold the study data. */
  public data: StudyData[] = [];

  /** Base URL for the study data API. */
  private readonly baseUrl: string = "/api/data";

  /**
   * Creates an instance of StudyDataService and injects the HttpClient.
   * 
   * @param http - An instance of HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves all study data from the API.
   * 
   * @returns An observable containing an array of StudyData objects.
   */
  getData$(): Observable<StudyData[]> {
    return this.http.get<StudyData[]>(`${this.baseUrl}`);
  }

  /**
   * Retrieves study data filtered by team ID from the API.
   * 
   * @param teamId - The ID of the team to filter the study data.
   * @returns An observable containing an array of StudyData objects related to the specified team.
   */
  getDataByTeamId$(teamId: number): Observable<StudyData[]> {
    return this.http.get<StudyData[]>(`${this.baseUrl}/${teamId}`);
  }
}
