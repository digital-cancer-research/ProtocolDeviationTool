import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisualisationService {
  private apiUrl = '/api/visualisation';

  constructor(private http: HttpClient) {}

  getTotalRows(siteId?: string): Observable<number> {
    const params = siteId ? new HttpParams().set('siteId', siteId) : undefined;
    return this.http.get<number>(`${this.apiUrl}/total-rows`, { params });
  }
}
