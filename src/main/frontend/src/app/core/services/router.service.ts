import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private urlPath$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationStart) => event.url)
  );

  constructor(public router: Router) { }

  get urlPaths$(): Observable<string> {
    return this.urlPath$;
  }

  get urlRoot$(): Observable<string> {
    return this.urlPath$.pipe(
      map((url) => {
        return url.split('/')[1];
      })
    )
  }

}
