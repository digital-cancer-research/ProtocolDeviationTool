import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { DataVisualisationComponent } from './data-visualisation/data-visualisation.component';
import { TeamLevelDashboardComponent } from './team-level-dashboard/team-level-dashboard.component';
import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page/data-visualisation-deviation-home-page.component';

const routes: Routes = [{
  path: '',
  component: DataVisualisationPageComponent,
  children: [
    { path: '', component: DataVisualisationComponent },
    { path: 'team-level-dashboard', component: TeamLevelDashboardComponent},
    // { path: 'team-level-dashboard', component: DataVisualisationDeviationHomePageComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVisualisationPageRoutingModule { }
