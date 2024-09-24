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
import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page/data-visualisation-deviation-home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryBarGraphSegmentedSiteComponent } from './data-visualisation-deviation-home-page/category-bar-graph-segmented-site/category-bar-graph-segmented-site.component';



@NgModule({
  declarations: [
    DataVisualisationPageComponent,
    DataVisualisationComponent,
    DataVisualisationDeviationHomePageComponent,
    TeamStudySelectComponent,
    CategoryBarGraphComponent,
    CategoryBarGraphSegmentedSiteComponent,
    TeamPdPieChartComponent,
    TeamStudyBarGraphComponent,
    VisualisationComponent,
  ],
  imports: [
    CommonModule,
    DataVisualisationPageRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:
    [
      CategoryBarGraphSegmentedSiteComponent
    ]
})
export class DataVisualisationPageModule { }
