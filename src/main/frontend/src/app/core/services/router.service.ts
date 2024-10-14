import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

/**
 * RouterService is responsible for observing and exposing the current URL path and root segment.
 * It provides observables and methods associated with the URL.
 */
@Injectable({
  providedIn: 'root'
})
export class RouterService {

  /**
   * Observable that emits the full URL path whenever a navigation event starts.
   * It listens for `NavigationStart` events.
   * 
   * @private
   */
  private urlPath$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationStart) => event.url)
  );

  /**
   * Constructs an instance of RouterService and initialises the Router dependency.
   * 
   * @param router - The Angular Router used to listen for routing events.
   */
  constructor(public router: Router) { }

  /**
   * Returns an observable that emits the full URL path when a navigation event occurs.
   * 
   * @returns Observable that emits the full URL as a string.
   */
  get urlPaths$(): Observable<string> {
    return this.urlPath$;
  }

  /**
   * Returns an observable that emits the first segment (root) of the URL.
   * It splits the URL and emits the segment immediately following the root domain.
   * 
   * @returns Observable that emits the root part of the URL as a string.
   */
  get urlRoot$(): Observable<string> {
    return this.urlPath$.pipe(
      map((url) => {
        return url.split('/')[1];
      })
    )
  }

}
