import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataVisualisationPageModule } from './features/data-visualisation-page/data-visualisation-page.module';
import { deactivatedUserGuard } from './core/guards/deactivated-user.guard';
import { DataUploadModule } from './features/data-upload/data-upload-page.module';
import { AdministrationPageModule } from './features/administration-page/administration-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'site',
    loadChildren: () => import('./features/site-page/site-page.module').then(m => m.SitePageModule),
  },
  {
    path: DataVisualisationPageModule.URL, 
    loadChildren: () => import('./features/data-visualisation-page/data-visualisation-page.module').then(m => m.DataVisualisationPageModule),
  },
  {
    path: DataUploadModule.URL,
    loadChildren: () => import('./features/data-upload/data-upload-page.module').then(m => m.DataUploadModule),
  },
  {
    path: AdministrationPageModule.URL,
    loadChildren: () => import('./features/administration-page/administration-page.module').then(m => m.AdministrationPageModule),
  },
  {
	path: '**',
	redirectTo: '/site',
	queryParams: {},
	queryParamsHandling: 'merge'
	
  },
].map(route => {
  if (route.redirectTo) {
    return route;
  } else {
    return {
      ...route,
      canActivate: [deactivatedUserGuard],
      canActivateChild: [deactivatedUserGuard]
    }
  }
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
