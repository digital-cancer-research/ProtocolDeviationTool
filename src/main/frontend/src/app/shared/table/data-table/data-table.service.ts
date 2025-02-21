import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DataUpdate } from 'src/app/core/models/data/data-update.model';
import { Dvcat } from 'src/app/core/new/services/models/dvcat/dvcat.model';
import { Dvdecod } from 'src/app/core/new/services/models/dvdecod/dvdecod.model';
import { DeviationService } from 'src/app/core/services/deviation.service';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  /** Stores available deviation categories. */
  public dvcats: Dvcat[] = [];

  /** Stores available deviation codes. */
  public dvdecods: Dvdecod[] = [];

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
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}?teamId=${teamId}`);
  }

  /**
   * Fetches data entries filtered by a specific study ID.
   * @param studyId - The ID of the study to filter by.
   * @returns An observable of an array of DataTableEntry.
   */
  public getDataByStudy$(study: string) {
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}?study=${study}`);
  }

  /**
   * Updates a specific data entry on the server.
   * @param entry - The data entry to update.
   * @returns An observable of void, indicating the completion of the request.
   */
  public updateEntry$(entry: DataUpdate) {
    return this.http.put<void>(`${this.BASE_URL}/update-entry`, entry);
  }
}
