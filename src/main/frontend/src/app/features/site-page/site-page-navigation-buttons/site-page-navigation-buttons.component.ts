import { Component, inject } from '@angular/core';
import { DataUploadModule } from '../../data-upload/data-upload-page.module';
import { DataVisualisationPageModule } from '../../data-visualisation-page/data-visualisation-page.module';
import { UserService } from 'src/app/core/new/services/user.service';
import { TeamService } from 'src/app/core/new/services/team.service';
import { map } from 'rxjs';
import { Role } from 'src/app/core/new/services/models/user/role.enum';

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
  private readonly teamService = inject(TeamService);
  private readonly userService = inject(UserService);
  links: string[] = [
    `/${DataUploadModule.URL}`,
    `/${DataVisualisationPageModule.URL}`
  ]

  /**
   * Boolean flag indicating whether the user is deactivated.
   * @type {boolean}
   */
  private isUserDeactivated$ = this.userService.currentUser$.pipe(
    map(user => user ? user.role === Role.DEACTIVATED : false)
  );

  isUserDeactivated: boolean = true;

  constructor() {
    this.isUserDeactivated$.subscribe(isUserDeactivated => this.isUserDeactivated = isUserDeactivated);
  }

  /**
   * Observable of the currently selected team from the `UserService`.
   * 
   * @type {Observable<Team | null>}
   */
  currentTeam$ = this.teamService.currentTeam$;
}
