import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualisationPageRoutingModule } from './data-visualisation-page-routing.module';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataVisualisationComponent } from './data-visualisation/data-visualisation.component';
import { VisualisationComponent } from './data-visualisation/visualisation/visualisation.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeamStudySelectComponent } from './data-visualisation/team-study-select/team-study-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryBarGraphComponent } from './data-visualisation/category-bar-graph/category-bar-graph.component';
import { TeamPdPieChartComponent } from "./data-visualisation/team-pd-pie-chart/team-pd-pie-chart.component";
import { TeamStudyBarGraphComponent } from "./data-visualisation/team-study-bar-graph/team-study-bar-graph.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamLevelDashboardComponent } from './team-level-dashboard/team-level-dashboard.component';
import { TeamPdDvdecodGraphComponent } from "./team-level-dashboard/team-pd-dvdecod-graph/team-pd-dvdecod-graph.component";
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DvdecodBarGraphComponent } from "./team-level-dashboard/dvdecod-bar-graph/dvdecod-bar-graph.component";
import { SelectDialogComponent } from './data-visualisation/team-study-select/select-dialog/select-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { UserService } from 'src/app/core/services/user.service';
import { Team } from 'src/app/core/models/team.model';


@NgModule({
  declarations: [
    DataVisualisationPageComponent,
    DataVisualisationComponent,
    TeamLevelDashboardComponent,
    TeamPdDvdecodGraphComponent,
    TeamStudySelectComponent,
    CategoryBarGraphComponent,
    TeamPdPieChartComponent,
    TeamStudyBarGraphComponent,
    VisualisationComponent,
    DvdecodBarGraphComponent,
    SelectDialogComponent
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
    MatRadioModule
  ],
})

export class DataVisualisationPageModule {
  public static URL = "data-visualisation";
  private static currentTeam: Team | null = null;
  
  constructor(userService: UserService) {
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
      case ("data-visualisation"): {
        return "TEAM SUMMARY DASHBOARD";
      }
      case ('team-level-dashboard'): {
        return `${this.currentTeam ? this.currentTeam.teamName : "TEAM"} PROTOCOL DEVIATIONS`;
      }
      default: {
        return "";
      }
    }
  }

}

