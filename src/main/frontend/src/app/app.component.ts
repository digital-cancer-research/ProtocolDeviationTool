import { Component, inject } from '@angular/core';
import { UrlService } from './core/services/url.service';
import { NavigationEnd } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { SitePageComponent } from './features/site-page/site-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private title = 'frontend';

  private readonly urlService = inject(UrlService);

  protected isFooterVisible: boolean = false;

  private readonly PAGES_WITH_FOOTER = [
    `/${HomePageComponent.URL}`,
    `/${SitePageComponent.URL}`
  ]

  constructor() {
    this.urlService.newNav$().subscribe(nav => {
      const url = (nav as unknown as NavigationEnd).url;
      this.isFooterVisible = this.PAGES_WITH_FOOTER.some(pageUrl => pageUrl.includes(url));
    })
  }
}
