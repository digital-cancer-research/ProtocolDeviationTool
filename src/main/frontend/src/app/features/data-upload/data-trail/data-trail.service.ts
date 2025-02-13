import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataAudit } from '../models/data-audit.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTrailService {
  private readonly BASE_URL = "/api/data/audit"
  private readonly http = inject(HttpClient);
  
  public getDataAudit$(): Observable<DataAudit[]> {
    return this.http.get<DataAudit[]>(this.BASE_URL);
  }
}