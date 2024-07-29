import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteStudyLevelSelectService {
	private baseUrl = 'api/studies/study-ids';
	#selectedLevelSubject = new BehaviorSubject<string | null>(null);
	selectedLevelObservable$ = this.#selectedLevelSubject.asObservable();
	#selectedStudySubject = new BehaviorSubject<string>('');
	selectedStudyIdObservable$ = this.#selectedStudySubject.asObservable();
	
	  constructor(private http: HttpClient) {}

	  getAllStudyIds(): Observable<string[]> {
	    return this.http.get<string[]>(this.baseUrl);
	  }

	  setSelectedStudyId(studyId: string | null) {
		if (studyId !== null) {
			this.#selectedStudySubject.next(studyId);
		}
	  }

	  getSelectedStudy() {
		return this.#selectedStudySubject.value;
	  }

	  setSelectedLevel(level: string | null) {
		this.#selectedLevelSubject.next(level);
	  }

	  getSelectedLevel() {
		return this.#selectedLevelSubject.value;
	  }
}