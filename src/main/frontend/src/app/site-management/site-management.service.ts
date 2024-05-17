import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteManagementService {
  private readonly baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  
  getUniqueSites(): Observable<any[]> {
    // Make an HTTP GET request to fetch sites
    return this.http.get<any[]>(`${this.baseUrl}/unique-sites`);
    }
  
  updateSites(siteIds: string[]): Observable<any> {
	    // Make an HTTP POST request to set active sites
	    return this.http.post(`${this.baseUrl}/update-sites`, siteIds);
	  }


}