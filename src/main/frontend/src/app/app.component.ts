import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UserService } from './core/services/user.service';
import { SitePageComponent } from './features/site-page/site-page.component';
import { AdministrationPageComponent } from './features/administration-page/administration-page.component';
import { AdministrationPageModule } from './features/administration-page/administration-page.module';
import { SiteManagementComponent } from './features/administration-page/site-management/site-management.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private title = 'frontend';

  /** 
   * Indicates whether the footer is visible.
   * @type {boolean}
   */
  protected isFooterVisible: boolean = false;

  /**
   * Creates an instance of AppComponent.
   * 
   * Listens for changes in the url and the user to 
   * manage access to the site and update footer visibility.
   * 
   * @param {Router} router - The Angular router instance for navigating between routes.
   * @param {UserService} userService - The service to manage user-related data and state.
   */
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    const navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    combineLatest([navigationEnd$, userService.currentUser$])
      .subscribe(([event, currentUser]) => {
        event = event as NavigationEnd;
        this.isFooterVisible = this.updateFooterVisibility(event.url);
        const lastNavigationUrl = this.router.lastSuccessfulNavigation
          ?.previousNavigation
          ?.finalUrl
          ?.toString() || "";

        if (event.url !== '' && event.url !== `/${SitePageComponent.URL}` && currentUser?.roleId === 3) {
          this.router.navigateByUrl(lastNavigationUrl);
        }
        if (event.url === `/${AdministrationPageModule.URL}/${SiteManagementComponent.URL}`) {
          this.router.navigateByUrl(lastNavigationUrl);
        }
      })
  }

  /**
   * Determines whether the footer should be visible based on the current URL.
   *
   * @param {string} url - The current URL of the application.
   * @returns {boolean} True if the footer should be visible, false otherwise.
   *
   * @description
   * This function extracts the root path from the URL and checks if it matches
   * specific cases where the footer should be visible. It returns true for
   * the root path ('') and the 'site' path, and false for all other paths.
   */
  updateFooterVisibility(url: string): boolean {
    const urlRoot = url.split('/')[1]
      .split('?').reverse().pop();
    switch (urlRoot) {
      case '':
      case 'site':
        return true;
      default:
        return false;
    }
  }
}
