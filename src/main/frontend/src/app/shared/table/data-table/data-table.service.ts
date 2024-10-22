import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DeviationService } from 'src/app/core/services/deviation.service';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  public dvcats: string[] = [];

  public dvdecods: string[] = [];

  private readonly BASE_URL = "/api/data"

  constructor(
    private http: HttpClient,
    private deviationService: DeviationService
  ) {
    deviationService.getDvcats$().subscribe(
      dvcats => this.dvcats = dvcats
    )
    deviationService.getDvdecods$().subscribe(
      dvdecods => this.dvdecods = dvdecods
    )
  }

  public getData$() {
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}`);
  }

  public getDataByTeamId$(teamId: number) {
    let params: HttpParams = new HttpParams().set('teamId', teamId);
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}`, { params });
  }
  
  public getDataByStudyId$(studyId: string) {
    let params: HttpParams = new HttpParams().set('studyId', studyId);
    return this.http.get<DataTableEntry[]>(`${this.BASE_URL}`, { params });
  }

  public updateEntry$(entry: DataTableEntry) {
    return this.http.put<void>(`${this.BASE_URL}/update-entry`, entry);
  }
}
