import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PieChartDataEntry } from '../../models/pie-chart-data-entry.model';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  constructor(private http: HttpClient) { }

  getCountPerStudiesByTeam$(teamId: number): Observable<PieChartDataEntry[]> {
    return this.http.get<PieChartDataEntry[]>(`/api/visualisation/count-per-study`, { params: { teamId: teamId } });
  }
}
