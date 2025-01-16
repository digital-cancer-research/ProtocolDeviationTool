import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Team } from '../models/team.model';
import { NavigationEnd, Router } from '@angular/router';
import { DataVisualisationPageModule } from 'src/app/features/data-visualisation-page/data-visualisation-page.module';
import { SitePageComponent } from 'src/app/features/site-page/site-page.component';
import { DataUploadComponent } from 'src/app/features/data-upload/data-upload/data-upload.component';
import { AdministrationPageModule } from 'src/app/features/administration-page/administration-page.module';
import { TitleCasePipe } from '@angular/common';

/**
 * HeaderComponent is responsible for managing the header UI element of the application,
 * including displaying the page title.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  /** List of users fetched from the user service */
  users: User[] = [];

  /** The currently selected user */
  selectedUser: User | null = null;

  /** The currently selected team */
  selectedTeam: Team | null = null;

  /** Subscription for the user list updates */
  usersSubscription!: Subscription;

  /** Subscription for the selected team updates */
  selectedTeamSubscription!: Subscription;

  /** The username of the currently selected user */
  usernameSelected: string = "";

  /** Observable that tracks the current URL path */
  urlPath$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url)
  );

  /** The root part of the current URL */
  urlRoot: string = "";

  /** The final path part of the current URL */
  urlFinalPath: string = ""

  /**
   * Constructor for the HeaderComponent.
   * 
   * @param userService - Service used to retrieve user data
   * @param authService - Service used for authentication and authorisation
   * @param router - Router for tracking navigation events
   */
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  /**
   * Initialises the component, sets up subscriptions for users, teams, and URL path,
   * and updates the page title based on the URL.
   */
  ngOnInit(): void {
    this.urlPath$.subscribe((url => {

      this.urlRoot = url.split('/')[1]
        .split('?')
        .reverse().pop() || "";

      const urlFinalPath = url.split('/')
        .pop()?.split('?')
        .reverse().pop() || "";
      if (urlFinalPath !== undefined) {
        this.urlFinalPath = urlFinalPath;
      }
    }))

    this.usersSubscription = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.selectedTeamSubscription = this.userService.currentUserSelectedTeam$.subscribe((team) => {
      this.selectedTeam = team;
    });

    this.userService.currentUser$.subscribe((user) => {
      if (user?.username !== undefined) {
        this.usernameSelected = user?.username;
        this.selectedUser = user;
      }
    });
  }

  /**
   * Cleans up the subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.usersSubscription) this.usersSubscription.unsubscribe();
    if (this.selectedTeamSubscription) this.selectedTeamSubscription.unsubscribe();
  }

  /**
   * Handles the selection of a user by their username.
   * 
   * @param username - The username of the user to select
   */
  onSelectUser(username: string): void {
    if (username === "") {
      this.selectedUser = null;
      this.userService.setCurrentUser(null);
      this.selectedTeam = null;
      this.userService.setCurrentUserSelectedTeam(null);
    }
    else {
      this.userService.getUserByUsername(username).subscribe(
        (user) => {
          if (user !== this.selectedUser) {
            this.selectedTeam = null;
            this.userService.setCurrentUserSelectedTeam(null);
          }
          this.selectedUser = user;
          this.userService.setCurrentUser(user);

          this.userService.getUserTeamsByUserId(this.selectedUser.userId).subscribe(
            (teams) => {
              if (teams.length === 1) {
                this.userService.setCurrentUserSelectedTeam(teams[0]);
                user.selectedTeam = teams[0];
                this.selectedTeam = teams[0];
              }
            })
        })
    }
  }

  /**
   * Gets the page title based on the current URL.
   * Formats the page title with `TitleCasePipe` unless the page is from DataVisualisation module.
   * This is to allow custom formatting - keeping the study name in its original form.
   */
  get pageTitle(): string {
    let title = "";
    switch (this.urlRoot) {
      case (SitePageComponent.URL): {
        title = "SITE";
        break;
      }
      case (DataUploadComponent.URL): {
        title = "DATA UPLOAD";
        break;
      }
      case (DataVisualisationPageModule.URL): {
        title = DataVisualisationPageModule.getTitle(this.urlFinalPath);
        return title;
      }
      case (AdministrationPageModule.URL): {
        title = "ADMINISTRATOR";
        break;
      }
      default: {
        title = "";
        break;
      }
    }
    const tc = new TitleCasePipe();
    return tc.transform(title);
  }
}
