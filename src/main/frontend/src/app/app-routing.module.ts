import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'site-sponsor-page', component: SiteSponsorPageComponent },
  { path: 'site', loadChildren: () => import('./features/site-page/site-page.module').then(m => m.SitePageModule) },
  { path: 'data-visualisation', loadChildren: () => import('./features/data-visualisation-page/data-visualisation-page.module').then(m => m.DataVisualisationPageModule) },
  { path: 'data-upload', loadChildren: () => import('./features/data-upload/data-upload-page.module').then(m => m.DataUploadModule) },
  { path: 'administration-page', loadChildren: () => import('./features/administration-page/administration-page.module').then(m => m.AdministrationPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
