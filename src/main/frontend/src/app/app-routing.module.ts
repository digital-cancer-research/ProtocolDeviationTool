import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';
import { DataVisualisationPageModule } from './features/data-visualisation-page/data-visualisation-page.module';
import { deactivatedUserGuard } from './core/guards/deactivated-user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [deactivatedUserGuard]
  },
  {
    path: 'site-sponsor-page',
    component: SiteSponsorPageComponent,
    canActivate: [deactivatedUserGuard]
  },
  {
    path: 'site',
    loadChildren: () => import('./features/site-page/site-page.module').then(m => m.SitePageModule),
    canActivate: [deactivatedUserGuard]
  },
  {
    path: DataVisualisationPageModule.URL, loadChildren: () => import('./features/data-visualisation-page/data-visualisation-page.module').then(m => m.DataVisualisationPageModule),

    canActivate: [deactivatedUserGuard]
  },
  {
    path: 'data-upload',
    loadChildren: () => import('./features/data-upload/data-upload-page.module').then(m => m.DataUploadModule),
    canActivate: [deactivatedUserGuard]
  },
  {
    path: 'administration-page',
    loadChildren: () => import('./features/administration-page/administration-page.module').then(m => m.AdministrationPageModule),
    canActivate: [deactivatedUserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
