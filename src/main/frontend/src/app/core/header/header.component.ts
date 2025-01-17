import { Component, OnInit, inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { DataVisualisationPageModule } from 'src/app/features/data-visualisation-page/data-visualisation-page.module';
import { SitePageComponent } from 'src/app/features/site-page/site-page.component';
import { DataUploadComponent } from 'src/app/features/data-upload/data-upload/data-upload.component';
import { AdministrationPageModule } from 'src/app/features/administration-page/administration-page.module';
import { TitleCasePipe } from '@angular/common';
import { UserService } from '../new/services/user.service';
import { User } from '../new/services/models/user.model';
import { TeamService } from '../new/services/team.service';

/**
 * HeaderComponent is responsible for managing the header UI element of the application,
 * including displaying the page title.
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

  selectedTeam$ = this.teamService.currentTeam$;

  users: User[] = [];

  urlPath$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url)
  );

  urlRoot: string = "";

  urlFinalPath: string = ""

  /**
   * Initialises the component by loading the list of users 
   * and tracks the url root.
   */
  ngOnInit(): void {
    this.userService.getUsers$().subscribe(users => this.users = users);
    this.urlPath$.subscribe((url) => {
      this.urlRoot = url.split('/')[1];
    })
  }

  /**
   * Handles the selection of a user.
   * 
   * @param user - The selected user.
   */
  onSelectUser(user: User): void {
    this.userService.setUser(user);
    this.userService.getUserTeams(user.id).subscribe(teams => {
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
