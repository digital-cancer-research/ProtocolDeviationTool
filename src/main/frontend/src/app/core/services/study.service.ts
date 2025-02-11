import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Study } from '../new/services/models/study/study.model';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private readonly BASE_URL = 'api/studies';
  private readonly http = inject(HttpClient)
  private studySubject = new BehaviorSubject<Study | null>(null);
  private study$: Observable<Study | null> = new Observable();

  getStudies(teamId?: number): Observable<Study[]> {
    return this.http.get<Study[]>(`${this.BASE_URL}?teamId=${teamId}`);
  }

  selectedStudy$() {
    return this.study$;
  }

  setStudy(study: Study | null) {
    return this.studySubject.next(study);
  }
}
