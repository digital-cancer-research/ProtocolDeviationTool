import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudyList } from './study-list.model'; // Import the correct model

@Injectable({
  providedIn: 'root',
})
export class StudyListService {
  private baseUrl = 'api/studies';

  constructor(private http: HttpClient) {}

  getStudies(): Observable<StudyList[]> { // Update to use the correct model
    return this.http.get<StudyList[]>(`${this.baseUrl}`);
  }

  updateStudyName(studyId: string, newName: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${studyId}`, { studyName: newName });
  }
}