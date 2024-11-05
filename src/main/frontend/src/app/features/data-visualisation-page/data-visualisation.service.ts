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

  public pdCategories: string[] = [];
  public barChartColours: string[] = [];

  constructor(
    private http: HttpClient,
  ) {
    
    this.pdCategories$
      .subscribe(categories => this.pdCategories = categories);

    this.barChartColours$
      .subscribe(colours => this.barChartColours = colours
      );
  }

  get categoryColours$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/category-colours`);
  }

  private get pdCategories$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/pd-categories`);
  }

  private get barChartColours$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/bar-chart-colours`);
  }

  getCategoryBarGraphDataByTeam$(teamId: number): Observable<CategoryBarGraphData[]> {
    return this.http.get<CategoryBarGraphData[]>(`${this.baseUrl}/team-pd-categories?teamId=${teamId}`);
  }
  
  getCategoryBarGraphDataByStudy$(studyId: string): Observable<CategoryBarGraphData[]> {
    return this.http.get<CategoryBarGraphData[]>(`${this.baseUrl}/team-pd-categories?teamId=${studyId}`);
  }

  getPdDvdecodBarGraphDataByTeam$(teamId: number): Observable<PdDvdecodBarGraphData> {
    return this.http.get<PdDvdecodBarGraphData>(`${this.baseUrl}/team-pd-categories/dvdecod-breakdown?teamId=${teamId}`);
  }
  
  getPdDvdecodBarGraphDataByStudy$(studyId: string): Observable<PdDvdecodBarGraphData> {
    return this.http.get<PdDvdecodBarGraphData>(`${this.baseUrl}/team-pd-categories/dvdecod-breakdown?teamId=${studyId}`);
  }
}
