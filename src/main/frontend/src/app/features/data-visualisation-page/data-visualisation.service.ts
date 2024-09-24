import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryBarGraphData } from './models/category-bar-graph-data.model';

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

  getCategoryBarGraphData$(teamId: number): Observable<CategoryBarGraphData[]> {
    return this.http.get<CategoryBarGraphData[]>(`${this.baseUrl}/team-pd-categories?teamId=${teamId}`);
  }
}
