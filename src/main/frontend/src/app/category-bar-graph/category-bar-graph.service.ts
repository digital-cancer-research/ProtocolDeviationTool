import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryCountPerCategoryDTO } from './category-bar-graph.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryBarGraphService {
	  private apiUrl = '/api/visualisation';

	  constructor(private http: HttpClient) {}

	  getEntryCountPerCategory(siteId?: string): Observable<EntryCountPerCategoryDTO[]> {
		  const params = siteId ? new HttpParams().set('siteId', siteId) : undefined;
	    return this.http.get<EntryCountPerCategoryDTO[]>(`${this.apiUrl}/entry-counts-per-category`, { params });
	  }
	}