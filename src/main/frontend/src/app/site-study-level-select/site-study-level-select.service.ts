import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteStudyLevelSelectService {
	private baseUrl = 'api/studies/study-ids';
	#selectedStudyIdSubject = new BehaviorSubject<string>('');
	selectedStudyIdObservable = this.#selectedStudyIdSubject.asObservable();
	
	  constructor(private http: HttpClient) {}

	  getAllStudyIds(): Observable<string[]> {
	    return this.http.get<string[]>(this.baseUrl);
	  }

	  setSelectedStudyId(value: string | null) {
		if (value !== null) {
			this.#selectedStudyIdSubject.next(value);
		}
	  }

	  getSelectedStudyId() {
		return this.#selectedStudyIdSubject.value;
	  }
}