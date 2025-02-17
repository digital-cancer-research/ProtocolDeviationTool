import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditTrailData } from '../models/audit-trail-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuditTrailManagementService {
  private readonly BASE_url = 'api/audit/admin';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves audit trail data from the server.
   * 
   * This method sends a GET request to the server to fetch audit trail information.
   * The data is returned as an Observable of an array of AuditTrailData objects.
   * 
   * @returns An Observable that emits an array of AuditTrailData objects representing the audit trail information.
   */
  getAuditTrailData(): Observable<AuditTrailData[]> {
    return this.http.get<AuditTrailData[]>(`${this.BASE_url}`);
  }
}