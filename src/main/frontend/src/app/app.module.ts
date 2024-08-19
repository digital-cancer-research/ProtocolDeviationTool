import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

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
import { CategoryBarGraphSegmentedComponent } from './category-bar-graph-segmented/category-bar-graph-segmented.component';
import { SiteSelectComponent } from './site-select/site-select.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministratorPageComponent } from './administrator-page/administrator-page.component';
import { SitePageComponent } from './site-page/site-page.component';
import { SiteTeamDataSelectComponent } from './site-team-data-select/site-team-data-select.component';
import { DataUploadPageComponent } from './data-upload-page/data-upload-page.component';
import { DataVisualisationPageComponent } from './data-visualisation-page/data-visualisation-page.component';
import { SiteTeamDataSelectMultiteamComponent } from './site-team-data-select-multiteam/site-team-data-select-multiteam.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { SiteManagementComponent } from './site-management/site-management.component';
import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page/data-visualisation-deviation-home-page.component';
import { DataVisualisationDeviationsPageComponent } from './data-visualisation-deviations-page/data-visualisation-deviations-page.component';
import { DataVisualisationDeviationsOverTimePageComponent } from './data-visualisation-deviations-over-time-page/data-visualisation-deviations-over-time-page.component';
import { SiteStudyLevelSelectComponent } from './site-study-level-select/site-study-level-select.component';
import { AuditTrailManagementComponent } from './audit-trail-management/audit-trail-management.component';
import { CategoryBarGraphSegmentedSiteComponent } from './category-bar-graph-segmented-site/category-bar-graph-segmented-site.component';
import { BorderComponent } from './border/border.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiteSponsSelectComponent } from './site-spons-select/site-spons-select.component';
import { NavigationRibbonComponent } from './navigation-ribbon/navigation-ribbon.component';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';

import { UploadService } from './upload/upload.service';
import { UserService } from './user/user.service';
import { AuthService  } from './user/auth.service';
import { UserManagementService } from './user-management/user-management.service';
import { FileListService } from './file-list/file-list.service';
import { StudyListService } from './study-list/study-list.service';
import { VisualisationService } from './visualisation/visualisation.service';
import { CategoryBarGraphService } from './category-bar-graph/category-bar-graph.service';
import { CategoryPieGraphService } from './category-pie-graph/category-pie-graph.service';
import { CategoryBarGraphSegmentedService } from './category-bar-graph-segmented/category-bar-graph-segmented.service';
import { SiteSelectService } from './site-select/site-select.service';
import { ShareSiteDataService } from './site-select/share-site-data.service';
import { TeamManagementService } from './team-management/team-management.service';
import { SiteManagementService } from './site-management/site-management.service';
import { SiteStudyLevelSelectService } from './site-study-level-select/site-study-level-select.service';
import { AuditTrailManagementService } from './audit-trail-management/audit-trail-management.service';
import { CategoryBarGraphSegmentedSiteService } from './category-bar-graph-segmented-site/category-bar-graph-segmented-site.service';
import { ChartModule } from 'primeng/chart';
import { DataUploadTabComponent } from "./data-upload-tab/data-upload-tab.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({ declarations: [
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
        AdministratorPageComponent,
        SitePageComponent,
        SiteTeamDataSelectComponent,
        DataUploadPageComponent,
        DataVisualisationPageComponent,
        SiteTeamDataSelectMultiteamComponent,
        TeamManagementComponent,
        CategoryBarGraphSegmentedComponent,
        SiteManagementComponent,
        DataVisualisationDeviationHomePageComponent,
        DataVisualisationDeviationsPageComponent,
        DataVisualisationDeviationsOverTimePageComponent,
        SiteStudyLevelSelectComponent,
        AuditTrailManagementComponent,
        CategoryBarGraphSegmentedSiteComponent,
        DataUploadTabComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        CoreModule,
        SharedModule,
        ChartModule,
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
        TeamManagementService,
        CategoryBarGraphSegmentedService,
        SiteManagementService,
        SiteStudyLevelSelectService,
        AuditTrailManagementService,
        CategoryBarGraphSegmentedSiteService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
    ] })
export class AppModule { }
