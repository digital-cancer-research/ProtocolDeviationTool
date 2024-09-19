import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
