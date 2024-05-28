import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditTrailManagementService {
  private readonly baseUrl = 'api/users';

  constructor(private http: HttpClient) {}
  
  getAuditTrailData(): Observable<any[]> {
    // Make an HTTP GET request to fetch sites
    return this.http.get<any[]>(`${this.baseUrl}/get-audit-trail-data`);
    }

}