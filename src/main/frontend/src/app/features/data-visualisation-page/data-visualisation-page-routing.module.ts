import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataVisualisationPageComponent } from './data-visualisation-page.component';
import { DataVisualisationComponent } from './data-visualisation/data-visualisation.component';
import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page/data-visualisation-deviation-home-page.component';

const routes: Routes = [{
  path: '',
  component: DataVisualisationPageComponent,
  children: [
    { path: '', component: DataVisualisationComponent },
    { path: 'data-visualisation-deviation-home', component: DataVisualisationDeviationHomePageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVisualisationPageRoutingModule { }
