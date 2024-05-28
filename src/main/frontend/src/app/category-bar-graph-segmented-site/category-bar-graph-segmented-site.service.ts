import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryCountPerSubcategoryPerCategoryDTO } from './category-bar-graph-segmented-site.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryBarGraphSegmentedSiteService {
	  private apiUrl = '/api/visualisation';

	  constructor(private http: HttpClient) {}

	  getEntryCountPerSubcategoryPerCategory(siteId?: string): Observable<EntryCountPerSubcategoryPerCategoryDTO[]> {
		  const params = siteId ? new HttpParams().set('siteId', siteId) : undefined;
	    return this.http.get<EntryCountPerSubcategoryPerCategoryDTO[]>(`${this.apiUrl}/entry-counts-per-subcategory-per-category`, { params });
	  }
	}