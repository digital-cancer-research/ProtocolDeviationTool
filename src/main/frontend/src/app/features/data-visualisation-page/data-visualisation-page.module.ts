import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualisationPageRoutingModule } from './data-visualisation-page-routing.module';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataVisualisationComponent } from './data-visualisation/data-visualisation.component';


@NgModule({
  declarations: [
    DataVisualisationPageComponent,
    DataVisualisationComponent
  ],
  imports: [
    CommonModule,
    DataVisualisationPageRoutingModule,
    MatGridListModule
  ]
})
export class DataVisualisationPageModule { }
