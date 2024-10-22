import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DeviationService } from 'src/app/core/services/deviation.service';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  /** Stores available deviation categories. */
  public dvcats: string[] = [];

  /** Stores available deviation codes. */
  public dvdecods: string[] = [];

  /** Base URL for the data table API endpoints. */
  private readonly BASE_URL = "/api/data"

  /**
   * Creates an instance of DataTableService.
   * @param http - The HttpClient instance for making HTTP requests.
   * @param deviationService - The DeviationService to fetch deviation categories and codes.
   */
  constructor(
    private http: HttpClient,
    private deviationService: DeviationService
  ) {
    deviationService.getDvcats$().subscribe(
      dvcats => this.dvcats = dvcats
    );
    deviationService.getDvdecods$().subscribe(
      dvdecods => this.dvdecods = dvdecods
    );
  }

  /**
   * Fetches all data entries from the server.
   * @returns An observable of an array of DataTableEntry.
   */
  public getData$() {
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}`);
  }

  /**
   * Fetches data entries filtered by a specific team ID.
   * @param teamId - The ID of the team to filter by.
   * @returns An observable of an array of DataTableEntry.
   */
  public getDataByTeamId$(teamId: number) {
    let params: HttpParams = new HttpParams().set('teamId', teamId);
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}`, { params });
  }

  /**
   * Fetches data entries filtered by a specific study ID.
   * @param studyId - The ID of the study to filter by.
   * @returns An observable of an array of DataTableEntry.
   */
  public getDataByStudyId$(studyId: string) {
    let params: HttpParams = new HttpParams().set('studyId', studyId);
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}`, { params });
  }

  /**
   * Updates a specific data entry on the server.
   * @param entry - The data entry to update.
   * @returns An observable of void, indicating the completion of the request.
   */
  public updateEntry$(entry: DataTableEntry) {
    return this.http.put<void>(`${this.BASE_URL}/update-entry`, entry);
  }
}
