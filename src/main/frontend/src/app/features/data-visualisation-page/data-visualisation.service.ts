import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryBarGraphData } from './models/category-bar-graph-data.model';
import { PieChartDataEntry } from './models/pie-chart-data-entry.model';
import { StudyBarGraphData } from './models/study-bar-graph-data.model';

/**
 * Service for managing data visualisation operations.
 */
@Injectable({
  providedIn: 'root'
})
export class DataVisualisationService {
  private BASE_URL = '/api/visualisation';
  private readonly http = inject(HttpClient);
  public pdCategories: string[] = [];
  public barChartColours: string[] = [];

  /**
   * Retrieves the count of PDs for a given team.
   *
   * @param teamId the ID of the team
   * @return an Observable containing the count of PDs
   */
  getPdCount$(teamId?: number) {
    return this.http.get<number>(`${this.BASE_URL}/pds?teamId=${teamId}`);
  }
  
  /**
   * Retrieves the PDs per DV category for a given team.
   *
   * @param teamId the ID of the team
   * @return an Observable containing the list of PDs per DV category
   */
  getPdsPerDvcat$(teamId?: number) {
    return this.http.get<CategoryBarGraphData[]>(`${this.BASE_URL}/pds-per-dvcat?teamId=${teamId}`);
  }
  
  /**
   * Retrieves the PDs per study for a given team.
   *
   * @param teamId the ID of the team
   * @return an Observable containing the list of PDs per study
   */
  getPdsPerStudy$(teamId?: number) {
    return this.http.get<PieChartDataEntry[]>(`${this.BASE_URL}/pds-per-study?teamId=${teamId}`);
  }
  
  /**
   * Retrieves the PDs per DV category per study for a given team.
   *
   * @param teamId the ID of the team
   * @return an Observable containing the PDs per DV category per study
   */
  getPdsPerDvcatPerStudy$(teamId?: number) {
    return this.http.get<StudyBarGraphData>(`${this.BASE_URL}/pds-per-dvcat-per-study?teamId=${teamId}`);
  }
}
