import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryCountPerCategoryPerStudyDTO } from './category-bar-graph-segmented.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryBarGraphSegmentedService {
	  private apiUrl = '/api/visualisation';

	  constructor(private http: HttpClient) {}

	  getEntryCountPerCategoryPerStudy(siteId?: string): Observable<EntryCountPerCategoryPerStudyDTO[]> {
		  const params = siteId ? new HttpParams().set('siteId', siteId) : undefined;
	    return this.http.get<EntryCountPerCategoryPerStudyDTO[]>(`${this.apiUrl}/entry-counts-per-category-per-study`, { params });
	  }
	}