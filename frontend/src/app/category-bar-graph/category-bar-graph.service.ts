import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryCountPerCategoryDTO } from './category-bar-graph.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryBarGraphService {
	  private apiUrl = '/api/visualisation';

	  constructor(private http: HttpClient) {}

	  getEntryCountPerCategory(): Observable<EntryCountPerCategoryDTO[]> {
	    return this.http.get<EntryCountPerCategoryDTO[]>(`${this.apiUrl}/entry-counts-per-category`);
	  }
	}