import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualisationPageRoutingModule } from './data-visualisation-page-routing.module';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { UserService } from 'src/app/core/services/user.service';
import { Team } from 'src/app/core/models/team.model';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryBarGraphComponent } from './dashboard/category-bar-graph/category-bar-graph.component';
import { TeamPdPieChartComponent } from './dashboard/team-pd-pie-chart/team-pd-pie-chart.component';
import { TeamStudyBarGraphComponent } from './dashboard/team-study-bar-graph/team-study-bar-graph.component';
import { SelectDialogComponent } from './dashboard/team-study-select/select-dialog/select-dialog.component';
import { TeamStudySelectComponent } from './dashboard/team-study-select/team-study-select.component';
import { VisualisationComponent } from './dashboard/visualisation/visualisation.component';
import { DetailedViewComponent } from './dashboard/detailed-view/detailed-view.component';
import { TotalPdsComponent } from './dashboard/detailed-view/total-pds/total-pds.component';
import { TotalPdsOverTimeComponent } from './dashboard/detailed-view/total-pds-over-time/total-pds-over-time.component';
import { DvcatDvdecodBreakdownGraphComponent } from './dashboard/detailed-view/total-pds/dvcat-dvdecod-breakdown-graph/dvcat-dvdecod-breakdown-graph.component';
import { DvdecodGraphComponent } from './dashboard/detailed-view/total-pds/dvdecod-graph/dvdecod-graph.component';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    DataVisualisationPageComponent,
    TeamStudySelectComponent,
    CategoryBarGraphComponent,
    TeamPdPieChartComponent,
    TeamStudyBarGraphComponent,
    VisualisationComponent,
    SelectDialogComponent,
    DashboardComponent,
    DetailedViewComponent,
    TotalPdsComponent,
    DvcatDvdecodBreakdownGraphComponent,
    DvdecodGraphComponent,
    TotalPdsOverTimeComponent
  ],
  imports: [
    CommonModule,
    DataVisualisationPageRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule
  ],
})

export class DataVisualisationPageModule {
  public static URL = "dashboard";
  private static currentTeam: Team | null = null;

  constructor(
    userService: UserService,
  ) {
    userService.currentUserSelectedTeam$.subscribe(team => DataVisualisationPageModule.currentTeam = team);
  }

  /**
   * Returns the page title of the visualisation pages based on the provided URL.
   * 
   * @param url - The URL path used to determine the title.
   * @returns The title for the corresponding page.
   */
  public static getTitle(url: string) {
    switch (url) {
      case (this.URL): {
        return "TEAM SUMMARY DASHBOARD";
      }
      case (TotalPdsComponent.URL):
      case (TotalPdsOverTimeComponent.URL): {
        let title = DetailedViewComponent.studyId;
        if (title === undefined) {
          title = this.currentTeam ? this.currentTeam.teamName : "Team";
        }
        return `${title} PROTOCOL DEVIATIONS`;
      }
      default: {
        return "";
      }
    }
  }

}

