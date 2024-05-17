import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteStudyLevelSelectService {
	private baseUrl = 'http://localhost:8080/api/studies/study-ids';

	  constructor(private http: HttpClient) {}

	  getAllStudyIds(): Observable<string[]> {
	    return this.http.get<string[]>(this.baseUrl);
	  }
	}