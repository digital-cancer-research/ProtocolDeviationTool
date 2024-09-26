import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';
  /** 
   * Indicates whether the footer is visible.
   * @type {boolean}
   */
  isFooterVisible: boolean = false;

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
        if (event.url !== '' && event.url !== '/site' && currentUser?.roleId === 3) {
          this.router.navigateByUrl('');
        }
      })
  }

  updateFooterVisibility(url: string): boolean {
    const urlRoot = url.split('/')[1];
    switch (urlRoot) {
      case '':
      case 'site':
        return true;
      default:
        return false;
    }
  }

}
