import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

/**
 * Routing module for the HomePage feature.
 * 
 * The `HomePageRoutingModule` defines the routes for the home page feature of the application.
 * It sets up the necessary paths and associates them with their respective components.
 * This module uses Angular's `RouterModule` to enable routing within the HomePage module.
 *
 * @export
 * @class HomePageRoutingModule
 */

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
