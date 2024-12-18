import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private readonly router = inject(Router);
  newNav$() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
  }
}
