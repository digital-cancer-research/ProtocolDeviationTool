import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviationService {
  private readonly BASE_URL = 'api/deviation'
  constructor(private http: HttpClient) { }

  public getDvcats$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/dvcats`);
  }

  public getDvdecods$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/dvdecods`);
  }

  public getDvdecodsByDvcat$(dvcat: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/dvdecods/${encodeURIComponent(dvcat.trim().toUpperCase())}`);
  }

  public getDvterms$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/dvterms`);
  }

  public getDvtermByDvdecod$(dvdecod: string): Observable<string> {
    return this.http.get<{dvterm: string}>(`${this.BASE_URL}/dvterm/${encodeURIComponent(dvdecod.trim().toUpperCase())}`)
    .pipe(
      map(response => response.dvterm)
    );
  }
}
