import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualisationService {
  private apiUrl = '/api/visualisation';

  constructor(private http: HttpClient) {}

  getTotalRows(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-rows`);
  }
}
