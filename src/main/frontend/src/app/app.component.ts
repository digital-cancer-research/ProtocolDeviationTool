import { Component, inject } from '@angular/core';
import { UrlService } from './core/services/url.service';
import { NavigationEnd } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { SitePageComponent } from './features/site-page/site-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  private readonly urlService = inject(UrlService);

  protected isFooterVisible: boolean = false;

  private readonly PAGES_WITH_FOOTER = [
    `/${SitePageComponent.URL}`
  ]

  constructor() {
    this.urlService.newNav$().subscribe(nav => {
      const url = (nav as unknown as NavigationEnd).url;
      this.isFooterVisible = this.shouldFooterBeVisible(url);
      
      if (url.replace('/', '') === HomePageComponent.URL) {
        this.redirectToSitePage();
      }
    })
  }

  shouldFooterBeVisible(url: string) {
    console.log(url);
    if (url === `/${HomePageComponent.URL}` || url.charAt(1) === '?') {
      console.log("Here")
      return true;
    } else {
      return this.PAGES_WITH_FOOTER.some(pageUrl => {
        return  pageUrl.includes(url)
      });
    }
  }

  redirectToSitePage(): void {
    this.urlService.redirectTo(SitePageComponent.URL);
  }
}
