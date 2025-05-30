import { Component, inject } from '@angular/core';
import { UrlService } from './core/services/url.service';
import { HomePageComponent } from './features/home-page/home-page.component';
import { SitePageComponent } from './features/site-page/site-page.component';
import { map } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  private readonly urlService = inject(UrlService);

  protected isFooterVisible: boolean = false;

  // HomePageComponent.URL omitted because it is an empty string - causes too many edge cases.
  private readonly PAGES_WITH_FOOTER = [
    `/${SitePageComponent.URL}`
  ]

  constructor() {
    this.getCurrentUrl$().subscribe(url => {
      this.updateFooterVisibility(url);
      this.redirectToSitePageIfOnHomePage(url);
    })
  }

  getCurrentUrl$() {
    return this.urlService.newNav$().pipe(
      map(nav => (nav as unknown as NavigationEnd).url)
    );
  }

  updateFooterVisibility(url: string) {
    this.isFooterVisible = this.shouldFooterBeVisible(url);
  }

  shouldFooterBeVisible(url: string): boolean {
    const baseUrl = url.split('?')[0];
    return baseUrl === `/${HomePageComponent.URL}` || this.PAGES_WITH_FOOTER.includes(baseUrl);
  }

  redirectToSitePageIfOnHomePage(url: string) {
    if (url.replace('/', '') === HomePageComponent.URL) {
      this.urlService.redirectTo(SitePageComponent.URL);
    }
  }
}
