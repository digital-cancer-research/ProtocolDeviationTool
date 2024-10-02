import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryBarGraphData } from './models/category-bar-graph-data.model';
import { PdDvdecodBarGraphData } from './models/team-pd-dvdecod-bar-graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class DataVisualisationService {
  private baseUrl = '/api/visualisation';

  constructor(
    private http: HttpClient,
  ) { }

  get categoryColours$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/category-colours`);
  }

  get PdCategories(): string[] {
    return [
      "ASSESSMENT OR TIME POINT COMPLETION",
      "ELIGIBILITY CRITERIA NOT MET",
      "EXCLUDED MEDICATION, VACCINE OR DEVICE",
      "FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL",
      "INFORMED CONSENT",
      "NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA",
      "STUDY PROCEDURE",
      "VISIT COMPLETION",
      "WRONG STUDY TREATMENT/ADMINISTRATION/DOSE",
      "SITE LEVEL ERROR"
    ]
  }

  get dvdecodColours(): string[] {
    return [
      '#5C0001', '#760001', '#900002', '#A80003', '#B90010',
      '#D20012', '#E40515', '#E6200F', '#F94902', '#FA4903',
      '#F95C02', '#F6790B', '#F47908', '#F19903', '#E7B503',
      '#D0C102', '#D5CE04', '#BBE453', '#A5F06A', '#A2F49B',
      '#C6F7D6', '#CEFFFF'
    ]     
  }

  getCategoryBarGraphData$(teamId: number): Observable<CategoryBarGraphData[]> {
    return this.http.get<CategoryBarGraphData[]>(`${this.baseUrl}/team-pd-categories?teamId=${teamId}`);
  }

  getPdDvdecodBarGraphData$(teamId: number): Observable<PdDvdecodBarGraphData> {
    return this.http.get<PdDvdecodBarGraphData>(`${this.baseUrl}/team-pd-categories/dvdecod-breakdown?teamId=${teamId}`);
  }
}
