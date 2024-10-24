import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../../user/auth.service';
import { User } from '../models/user.model';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Team } from '../models/team.model';
import { NavigationEnd, Router } from '@angular/router';
import { DataVisualisationPageModule } from 'src/app/features/data-visualisation-page/data-visualisation-page.module';

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
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Initialises the component, sets up subscriptions for users, teams, and URL path,
   * and updates the page title based on the URL.
   */
  ngOnInit(): void {
    this.urlPath$.subscribe((url => {
      let urlLinks: string[] = url.split('/');
      this.urlRoot = urlLinks[1];

      const urlFinalPath = urlLinks.pop();
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
          this.authService.checkAdminRole(username).subscribe();
        })
    }
  }

  /**
   * Checks if the current user has admin privileges.
   * 
   * @returns True if the user is an admin, false otherwise
   */
  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  /**
   * Gets the page title based on the current URL.
   */
  get pageTitle(): string {
    switch (this.urlRoot) {
      case ('site'): {
        return "SITE";
      }
      case ('data-upload'): {
        return "DATA UPLOAD";
      }
      case ('data-visualisation'): {
        return DataVisualisationPageModule.getTitle(this.urlFinalPath);
      }
      case ('administration-page'): {
        return "ADMINISTRATOR";
      }
      default: {
        return "";
      }
    }
  }
}
