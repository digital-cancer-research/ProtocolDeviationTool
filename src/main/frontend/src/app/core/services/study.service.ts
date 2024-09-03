import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private readonly baseUrl = 'api/studies';

  constructor(private http: HttpClient) { }

  getStudies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/study-ids`,);
  }
}
