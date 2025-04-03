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
import { Team } from '../new/services/models/team/team.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../new/services/models/user/role.enum';

/**
 * HeaderComponent is responsible for managing the header UI element of the application.
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

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  selectedTeam$ = this.teamService.currentTeam$;

  currentUser: User | null | undefined = undefined;

  currentTeam: Team | null | undefined = undefined;

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
    this.fetchUser$();
    this.fetchTeam$();
    this.updateUrlElements();
  }

  fetchUser$() {
    this.userService.getAuthenticatedUser$().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.userService.currentUserSubject.next(user);
        this.checkIfUserIsDeactivated(user);
      },
      error: (error) => {
        this.currentUser = null;
        console.error(error)
      }
    });
  }

  checkIfUserIsDeactivated(user: User) {
    if (user.role === Role.DEACTIVATED) {
      this.openSnackBar("Your account has been deactivated. Please contact your administrator.", "Dismiss");
    }
  }

  fetchTeam$() {
    this.teamService.currentTeam$.subscribe({
      next: (team) => {
        this.currentTeam = team;
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  updateUrlElements() {
    this.urlPath$.subscribe((url) => {
      const urlSegments = url.split('/');
      if (urlSegments.length > 1) {
        this.urlRoot = urlSegments[1];
        this.urlFinalPath = urlSegments.reverse()[0];
      } else {
        this.urlRoot = "";
        this.urlFinalPath = "";
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

  get username(): string {
    switch (this.currentUser) {
      case null:
        return "User does not exist";
      case undefined:
        return "Loading...";
      default:
        return this.currentUser.username
    }
  }

  get teamname(): string {
    switch (this.currentTeam) {
      case null:
        return "No team selected";
      case undefined:
        return "Loading...";
      default:
        return this.currentTeam.name
    }
  }
}