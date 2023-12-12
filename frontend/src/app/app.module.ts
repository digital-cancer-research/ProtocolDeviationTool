import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { UserSelectionComponent } from './user/user-selection.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HomeComponent } from './home/home.component';
import { FileListComponent } from './file-list/file-list.component';
import { StudyListComponent } from './study-list/study-list.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { CategoryBarGraphComponent } from './category-bar-graph/category-bar-graph.component';
import { CategoryPieGraphComponent } from './category-pie-graph/category-pie-graph.component';
import { SiteSelectComponent } from './site-select/site-select.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UploadService } from './upload/upload.service';
import { UserService } from './user/user.service';
import { AuthService  } from './user/auth.service';
import { UserManagementService } from './user-management/user-management.service';
import { FileListService } from './file-list/file-list.service';
import { StudyListService } from './study-list/study-list.service';
import { VisualisationService } from './visualisation/visualisation.service';
import { CategoryBarGraphService } from './category-bar-graph/category-bar-graph.service';
import { CategoryPieGraphService } from './category-pie-graph/category-pie-graph.service';
import { SiteSelectService } from './site-select/site-select.service';
import { ShareSiteDataService } from './site-select/share-site-data.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BorderComponent } from './border/border.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiteSponsSelectComponent } from './site-spons-select/site-spons-select.component';
import { NavigationRibbonComponent } from './navigation-ribbon/navigation-ribbon.component';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';




@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    UserSelectionComponent,
    UserManagementComponent,
    HomeComponent,
    FileListComponent,
    StudyListComponent,
    CategoryTableComponent,
    VisualisationComponent,
    CategoryBarGraphComponent,
    SiteSelectComponent,
    CategoryPieGraphComponent,
    DashboardComponent,
    BorderComponent,
    HeaderComponent,
    FooterComponent,
    SiteSponsSelectComponent,
    NavigationRibbonComponent,
    SiteSponsorPageComponent,
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AppRoutingModule,
	FormsModule,
	CommonModule,
],
  providers: [
    UploadService,
    UserService,
    AuthService,
    UserManagementService,
    FileListService,
    StudyListService,
    VisualisationService,
    CategoryBarGraphService,
    SiteSelectService,
    ShareSiteDataService,
    CategoryPieGraphService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
