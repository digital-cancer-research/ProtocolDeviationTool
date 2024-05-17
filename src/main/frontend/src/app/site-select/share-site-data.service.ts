import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareSiteDataService {
  private selectedSiteIdSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public selectedSiteId$: Observable<string | undefined> = this.selectedSiteIdSubject.asObservable();

  updateSelectedSiteId(siteId: string | undefined) {
    this.selectedSiteIdSubject.next(siteId);
  }
}
