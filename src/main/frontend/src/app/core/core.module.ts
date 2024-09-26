import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../shared/shared.module';
import { NavigationRibbonComponent } from './header/navigation-ribbon/navigation-ribbon.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


/**
 * @module CoreModule
 * The `CoreModule` is responsible for providing singleton services and
 * essential components that are used application-wide.
 * This module ensures that core functionality and components are available
 * throughout the application and instantiated only once for optimisation.
 */
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationRibbonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule,
    ChartModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [
    UserService,
    TeamService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationRibbonComponent
  ]
})
export class CoreModule { }
