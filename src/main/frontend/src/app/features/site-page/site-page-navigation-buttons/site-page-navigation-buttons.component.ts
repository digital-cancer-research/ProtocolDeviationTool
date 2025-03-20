import { Component, inject } from '@angular/core';
import { DataUploadModule } from '../../data-upload/data-upload-page.module';
import { DataVisualisationPageModule } from '../../data-visualisation-page/data-visualisation-page.module';
import { UserService } from 'src/app/core/new/services/user.service';
import { TeamService } from 'src/app/core/new/services/team.service';

/**
 * Component for displaying navigation buttons on the site page.
 * 
 * The `SitePageNavigationButtonsComponent` provides a UI for navigating between
 * different sections or functionalities related to the site. It utilises the `UserService`
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
  links: string[] = [
    `/${DataUploadModule.URL}`,
    `/${DataVisualisationPageModule.URL}`
  ]

  /**
   * Observable of the currently selected team from the `UserService`.
   * 
   * @type {Observable<Team | null>}
   */
  currentTeam$ = this.teamService.currentTeam$;
}
