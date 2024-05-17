import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';
import { AdministratorPageComponent } from './administrator-page/administrator-page.component';
import { SitePageComponent } from './site-page/site-page.component';
import { DataUploadPageComponent } from './data-upload-page/data-upload-page.component';
import { DataVisualisationPageComponent } from './data-visualisation-page/data-visualisation-page.component';
import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page/data-visualisation-deviation-home-page.component';

const routes: Routes = [
  { path: 'admin', component: AdministratorPageComponent},
  { path: '', component: SiteSponsorPageComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'site-sponsor-page', component: SiteSponsorPageComponent },
  { path: 'site', component: SitePageComponent },
  { path: 'data-upload', component: DataUploadPageComponent },
  { path: 'data-visualisation', component: DataVisualisationPageComponent },
  { path: 'data-visualisation-deviation-home', component: DataVisualisationDeviationHomePageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
