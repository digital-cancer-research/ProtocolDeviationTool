import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';

const routes: Routes = [{
  path: '',
  component: DataVisualisationPageComponent,
  children: [
    { path: '', component: DashboardComponent },
    { path: 'detailed-view', component: DetailedViewComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVisualisationPageRoutingModule { }
