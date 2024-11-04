import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailedViewComponent } from './dashboard/detailed-view/detailed-view.component';
import { TotalPdsComponent } from './dashboard/detailed-view/total-pds/total-pds.component';
import { TotalPdsOverTimeComponent } from './dashboard/detailed-view/total-pds-over-time/total-pds-over-time.component';

const routes: Routes = [{
  path: '',
  component: DataVisualisationPageComponent,
  children: [
    { path: '', component: DashboardComponent },
    { path: DetailedViewComponent.URL, 
      component: DetailedViewComponent,
      children: [
        { path: TotalPdsComponent.URL, component: TotalPdsComponent },
        { path: TotalPdsOverTimeComponent.URL, component: TotalPdsOverTimeComponent },
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVisualisationPageRoutingModule { }
