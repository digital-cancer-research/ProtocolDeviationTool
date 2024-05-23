import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareSiteDataService } from './share-site-data.service';

@Injectable({
  providedIn: 'root',
})

export class SiteSelectService {
  private readonly baseUrl = 'api';

  constructor(private http: HttpClient, private shareSiteDataService: ShareSiteDataService) {}

  getUniqueSiteIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/visualisation/unique-sites`);
  }

  selectSite(siteId: string) {
    this.shareSiteDataService.updateSelectedSiteId(siteId);
  }
}