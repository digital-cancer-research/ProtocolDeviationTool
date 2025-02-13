import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dvcat } from '../new/services/models/dvcat/dvcat.model';
import { Dvdecod } from '../new/services/models/dvdecod/dvdecod.model';

@Injectable({
  providedIn: 'root'
})
export class DeviationService {
  private readonly BASE_URL = 'api/deviation'
  constructor(private http: HttpClient) { }

  public getDvcats$(): Observable<Dvcat[]> {
    return this.http.get<Dvcat[]>(`${this.BASE_URL}/dvcats`);
  }

  public getDvdecods$(): Observable<Dvdecod[]> {
    return this.http.get<Dvdecod[]>(`${this.BASE_URL}/dvdecods`);
  }

  public getDvdecodsByDvcat$(dvcatIds: number[]): Observable<Dvdecod[]> {
    const dvcatIdsParam = dvcatIds.join(',');
    return this.http.get<Dvdecod[]>(`${this.BASE_URL}/dvdecods?dvcatIds=${dvcatIdsParam}`);
  }
}
