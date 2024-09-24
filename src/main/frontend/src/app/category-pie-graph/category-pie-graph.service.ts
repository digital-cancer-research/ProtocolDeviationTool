import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryCountPerStudyDTO } from './category-pie-graph.model';

@Injectable({
	providedIn: 'root',
})
export class CategoryPieGraphService {
	private apiUrl = '/api/visualisation';

	constructor(private http: HttpClient) { }

	getEntryCountPerStudy(siteId?: string): Observable<EntryCountPerStudyDTO[]> {
		const params = siteId ? new HttpParams().set('siteId', siteId) : undefined;
		return this.http.get<EntryCountPerStudyDTO[]>(`${this.apiUrl}/count-per-study`, { params });
	}
}