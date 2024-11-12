import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudyBarGraphData } from '../../models/study-bar-graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class StudyBarGraphService {
  private readonly URL: string = '/api/visualisation';
  constructor(private http: HttpClient) { }

  public getStudyBarGraphData$(): Observable<StudyBarGraphData> {
    return this.http.get<StudyBarGraphData>(`${this.URL}/study-breakdown`);
  }
  
  public getStudyBarGraphDataByTeam$(teamId: number): Observable<StudyBarGraphData> {
    return this.http.get<StudyBarGraphData>(`${this.URL}/study-breakdown`, {params: {teamId: teamId}});
  }
  
  public getStudyBarGraphDataByStudy$(studyId: number): Observable<StudyBarGraphData> {
    return this.http.get<StudyBarGraphData>(`${this.URL}/study-breakdown`, {params: {studyId: studyId}});
  }
}
