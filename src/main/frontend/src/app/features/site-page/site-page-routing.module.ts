import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitePageComponent } from './site-page.component';

const routes: Routes = [{ path: '', component: SitePageComponent }];

/**
 * Routing module for the Site Page feature.
 * 
 * The `SitePageRoutingModule` handles the routing configuration for the `SitePageComponent`.
 * It defines a single route that loads the `SitePageComponent` when the path is empty ('').
 * This module is configured for lazy loading and is imported in the feature module for 
 * the site page.
 * 
 * @export
 * @class SitePageRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitePageRoutingModule { }
