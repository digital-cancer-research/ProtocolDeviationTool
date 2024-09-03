import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageNavigationButtonsComponent } from "./home-page-navigation-buttons/home-page-navigation-buttons.component";

/**
 * Module for the home page feature of the application.
 *
 * The `HomePageModule` handles all the components, services, and other
 * elements related to the home page. This module includes routing
 * specific to the home page and imports necessary shared resources.
 * 
 * @export
 * @class HomePageModule
 */
@NgModule({
  declarations: [
    HomePageComponent,
    HomePageNavigationButtonsComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
]
})
export class HomePageModule { }
