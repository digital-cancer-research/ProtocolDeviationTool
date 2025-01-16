import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { RouterService } from '../../services/router.service';
import { AdministrationPageModule } from 'src/app/features/administration-page/administration-page.module';
import { DataUploadModule } from 'src/app/features/data-upload/data-upload-page.module';
import { DataVisualisationPageModule } from 'src/app/features/data-visualisation-page/data-visualisation-page.module';
import { Params } from '@angular/router';
import { User } from '../../models/user.model';

/**
 * Component that represents the ribbon in the navigation.
 */
@Component({
  selector: 'app-navigation-ribbon',
  templateUrl: './navigation-ribbon.component.html',
  styleUrls: ['./navigation-ribbon.component.css']
})
export class NavigationRibbonComponent implements OnDestroy {
  /** Boolean to track if the current user has admin privileges. */
  isAdmin: boolean = false;

  /** Boolean to track if the user is part of multiple teams. */
  isPartOfMultipleTeams: boolean = false;

  /** Subscription to handle authentication observables. */
  authSubscription!: Subscription;

  /** Subscription to handle user observables. */
  userSubscription!: Subscription;

  /** Navigation links for the ribbon, which are shown or hidden based on user permissions. */
  links: Link[] = [
    { label: '', route: '/', visible: true, disabled: false },
    { label: 'ADMINISTRATION', route: `/${AdministrationPageModule.URL}/user-management`, visible: () => this.isAdmin, disabled: false },
    { label: 'TEAM SELECTION', route: '/site', visible: () => this.isPartOfMultipleTeams, disabled: false },
    { label: 'DATA', route: `/${DataUploadModule.URL}`, visible: true, disabled: false },
    { label: 'VISUALISATION', route: `/${DataVisualisationPageModule.URL}`, visible: true, disabled: false }
  ];

  /** Currently active link in the navigation ribbon. */
  activeLink = this.links[0];

  /** Boolean to track if the user is deactivated. */
  isUserDeactivated: boolean = false;

  /** Query parameter to remove the studyId when ribbon tab is changed */
  queryParams: Params = {
    studyId: null
  }

  /**
   * Constructor to initialise services and subscriptions.
   * Subscribes to router events to update the active link based on the URL path.
   * 
   * @param authService - Service to handle authentication.
   * @param userService - Service to handle user-related operations.
   * @param routerService - Service to handle router events and extract URL paths.
   */
  constructor(
    private userService: UserService,
    private routerService: RouterService
  ) {

    routerService.urlRoot$.subscribe(
      (url) => {
        this.updateActiveLink(url);
      }
    )

    this.userService.currentUser$.subscribe(
      (user) => {
        if (user) {
          this.updateAdminAccess(user.username);
          this.updateMultipleTeamSelectionAccess(user.userId);
          this.updateVisualisationAccess();
          this.updateIsUserDeactivated(user);
        }
      })
  }


  /**
 * Updates the `isAdmin` property based on whether the given user has admin privileges.
 * Subscribes to the `authService.checkAdminRole` observable to determine the user's role.
 * 
 * @param username - The username of the user to check for admin privileges.
 */
  updateAdminAccess(username: string): void {
    this.isAdmin = true;
  }

  /**
   * Updates the `isPartOfMultipleTeams` property to indicate if the user is part of more than one team.
   * Sets the `activeLink` to the "TEAM SELECTION" link if the user is part of multiple teams.
   * 
   * @param userId - The ID of the user whose teams are to be retrieved.
   */
  updateMultipleTeamSelectionAccess(userId: number): void {
    this.userService.getUserTeamsByUserId(userId).subscribe(
      (team) => {
        this.isPartOfMultipleTeams = team.length > 1;
        this.activeLink = this.links[2];
      }
    );
  }

  /**
   * Updates the visibility and accessibility of the "VISUALISATION" link based on team selection.
   * Subscribes to the `currentUserSelectedTeam$` observable to check if a team is selected.
   */
  updateVisualisationAccess(): void {
    this.userService.currentUserSelectedTeam$.subscribe(
      (team) => {
        this.links[4].disabled = (team === null);
      }
    );
  }

  /**
   * Updates the `isUserDeactivated` property based on the user's role.
   * Sets the property to `true` if the user has a role ID of 3 (indicating deactivation).
   * 
   * @param user - The user object to check for deactivation status.
   */
  updateIsUserDeactivated(user: User): void {
    this.isUserDeactivated = user.roleId === 3;
  }


  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from all active subscriptions to avoid memory leaks.
   */
  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  /**
   * Getter to filter and return only the visible links in the navigation ribbon.
   * 
   * @returns An array of visible links based on user permissions.
   */
  get filteredLinks() {
    return this.links.filter(link => typeof link.visible === 'function' ?
      link.visible() : link.visible);
  }

  /**
   * Updates the active link based on the current URL.
   * 
   * @param url - The current URL as a string.
   */
  updateActiveLink(url: string): void {
    url = '/' + url;
    const search = this.links.map(
      links => url.includes(links.route));
    const index = search.lastIndexOf(true);
    this.activeLink = this.links[index];
  }
}

/**
 * Interface to define the structure of a link in the navigation ribbon.
 */
interface Link {
  /** The label text of the link. */
  label: string;

  /** The route path that the link navigates to. */
  route: string;

  /** Boolean or function that determines whether the link is visible. */
  visible: boolean | (() => boolean);

  /** Boolean that indicates if the link is disabled. */
  disabled: boolean;
}