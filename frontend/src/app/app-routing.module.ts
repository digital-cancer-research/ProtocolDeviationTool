import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';
import { AdministratorPageComponent } from './administrator-page/administrator-page.component';
import { SitePageComponent } from './site-page/site-page.component';

const routes: Routes = [
  { path: 'admin', component: AdministratorPageComponent},
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'site-sponsor-page', component: SiteSponsorPageComponent },
  { path: 'site', component: SitePageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
