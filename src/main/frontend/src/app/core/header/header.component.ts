import { Component, OnInit, inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { DataVisualisationPageModule } from 'src/app/features/data-visualisation-page/data-visualisation-page.module';
import { SitePageComponent } from 'src/app/features/site-page/site-page.component';
import { DataUploadComponent } from 'src/app/features/data-upload/data-upload/data-upload.component';
import { AdministrationPageModule } from 'src/app/features/administration-page/administration-page.module';
import { TitleCasePipe } from '@angular/common';
import { UserService } from '../new/services/user.service';
import { TeamService } from '../new/services/team.service';
import { User } from '../new/services/models/user/user.model';

/**
 * HeaderComponent is responsible for managing the header UI element of the application.
 * It displays the page title and handles user selection.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private readonly router = inject(Router);

  private readonly userService = inject(UserService);

  private readonly teamService = inject(TeamService);

  user: User | null = this.userService.getUser();

  selectedTeam$ = this.teamService.currentTeam$;

  users: User[] = [];

  /** The currently selected user */
  selectedUser: User | null = null;

  /** The currently selected team */
  selectedTeam: Team | null = null;

  /** Subscription for the user list updates */
  usersSubscription!: Subscription;

  currentUserSubscription!: Subscription;

  /** Subscription for the selected team updates */
  selectedTeamSubscription!: Subscription;

  /** The username of the currently selected user */
  usernameSelected: string = "";

  /** Observable that tracks the current URL path */
  urlPath$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url)
  );

  urlRoot: string = "";

  urlFinalPath: string = "";

  /**
   * Initialises the component by loading the list of users and tracking the URL root.
   */
  ngOnInit(): void {
    this.userService.getUsers$().subscribe(users => this.users = users);
    this.urlPath$.subscribe((url) => {
      const urlSegments = url.split('/');
      this.urlRoot = urlSegments[1];
      this.urlFinalPath = urlSegments.reverse()[0];
    });
  }

  /**
   * Cleans up the subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.usersSubscription) this.usersSubscription.unsubscribe();
    if (this.currentUserSubscription) this.currentUserSubscription.unsubscribe();
    if (this.selectedTeamSubscription) this.selectedTeamSubscription.unsubscribe();
  }

  /**
   * Handles the selection of a user by their username.
   * 
   * @param user - The selected user.
   */
  onSelectUser(user: User): void {
    this.userService.currentUserSubject.next(user);
    this.teamService.currentTeamSubject.next(null);
    this.userService.getUserTeams$(user.id).subscribe(teams => {
      if (teams.length === 1) {
        this.teamService.currentTeamSubject.next(teams[0]);
      }
    });
  }

  /**
   * Retrieves the page title based on the current URL root.
   * 
   * @returns The page title in title case.
   */
  get pageTitle(): string {
    let title = "";
    if (this.urlRoot.includes(SitePageComponent.URL)) {
      title = "SITE";
    } else if (this.urlRoot.includes(DataUploadComponent.URL)) {
      title = "DATA UPLOAD";
    } else if (this.urlRoot.includes(DataVisualisationPageModule.URL)) {
      title = DataVisualisationPageModule.getTitle(this.urlFinalPath);
    } else if (this.urlRoot.includes(AdministrationPageModule.URL)) {
      title = "ADMINISTRATOR";
    } else {
      title = "";
    }
    const tc = new TitleCasePipe();
    return tc.transform(title);
  }
}
