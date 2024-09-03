import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitePageRoutingModule } from './site-page-routing.module';
import { SitePageComponent } from './site-page.component';
import { SitePageNavigationButtonsComponent } from './site-page-navigation-buttons/site-page-navigation-buttons.component';
import { SitePageTeamSelectComponent } from './site-page-team-select/site-page-team-select.component';
import { SharedModule } from 'src/app/shared/shared.module';

/**
 * Module for the Site Page feature.
 * 
 * The `SitePageModule` encapsulates all components, services, and other code
 * related to the site page feature. It declares the main `SitePageComponent` along
 * with sub-components such as `SitePageNavigationButtonsComponent` and 
 * `SitePageTeamSelectComponent`. This module is responsible for importing
 * necessary dependencies and its own routing module (`SitePageRoutingModule`).
 * 
 * @export
 * @class SitePageModule
 */
@NgModule({
  declarations: [
    SitePageComponent,
    SitePageNavigationButtonsComponent,
    SitePageTeamSelectComponent
  ],
  imports: [
    CommonModule,
    SitePageRoutingModule,
    SharedModule
  ]
})
export class SitePageModule { }
