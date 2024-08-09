import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';
/**
 * @module CoreModule
 * The `CoreModule` is responsible for providing singleton services and
 * essential components that are used application-wide.
 * This module ensures that core functionality and components are available
 * throughout the application and instantiated only once for optimisation.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    TeamService
  ]
})
export class CoreModule { }
