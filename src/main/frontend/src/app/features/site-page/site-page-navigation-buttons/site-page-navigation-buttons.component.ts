import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

/**
 * Component for displaying navigation buttons on the site page.
 * 
 * The `SitePageNavigationButtonsComponent` provides a UI for navigating between
 * different sections or functionalities related to the site. It utilizes the `UserService`
 * to access the currently selected team.
 * 
 * @export
 * @class SitePageNavigationButtonsComponent
 */
@Component({
  selector: 'app-site-page-navigation-buttons',
  templateUrl: './site-page-navigation-buttons.component.html',
  styleUrls: ['./site-page-navigation-buttons.component.css']
})
export class SitePageNavigationButtonsComponent {
  
  /**
   * Observable of the currently selected team from the `UserService`.
   * 
   * @type {Observable<Team | null>}
   */
  currentTeam$ = this.userService.currentUserSelectedTeam$;

  /**
   * Creates an instance of SitePageNavigationButtonsComponent.
   * 
   * @param {UserService} userService - The service for managing user-related data and actions.
   */
  constructor(private userService: UserService) { }
}
