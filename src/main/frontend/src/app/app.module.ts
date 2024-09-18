import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user/user-selection.component';
import { StudyListComponent } from './study-list/study-list.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryBarGraphComponent } from './category-bar-graph/category-bar-graph.component';
import { CategoryPieGraphComponent } from './category-pie-graph/category-pie-graph.component';
import { CategoryBarGraphSegmentedComponent } from './category-bar-graph-segmented/category-bar-graph-segmented.component';
import { SiteSelectComponent } from './site-select/site-select.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataVisualisationDeviationHomePageComponent } from './data-visualisation-deviation-home-page/data-visualisation-deviation-home-page.component';
import { DataVisualisationDeviationsPageComponent } from './data-visualisation-deviations-page/data-visualisation-deviations-page.component';
import { DataVisualisationDeviationsOverTimePageComponent } from './data-visualisation-deviations-over-time-page/data-visualisation-deviations-over-time-page.component';
import { SiteStudyLevelSelectComponent } from './site-study-level-select/site-study-level-select.component';
import { CategoryBarGraphSegmentedSiteComponent } from './category-bar-graph-segmented-site/category-bar-graph-segmented-site.component';
import { BorderComponent } from './border/border.component';
import { SiteSponsSelectComponent } from './site-spons-select/site-spons-select.component';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';

import { UserService } from './user/user.service';
import { AuthService } from './user/auth.service';
import { StudyListService } from './study-list/study-list.service';
import { CategoryBarGraphService } from './category-bar-graph/category-bar-graph.service';
import { CategoryPieGraphService } from './category-pie-graph/category-pie-graph.service';
import { CategoryBarGraphSegmentedService } from './category-bar-graph-segmented/category-bar-graph-segmented.service';
import { SiteSelectService } from './site-select/site-select.service';
import { ShareSiteDataService } from './site-select/share-site-data.service';
import { SiteStudyLevelSelectService } from './site-study-level-select/site-study-level-select.service';
import { CategoryBarGraphSegmentedSiteService } from './category-bar-graph-segmented-site/category-bar-graph-segmented-site.service';
import { ChartModule } from 'primeng/chart';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        UserSelectionComponent,
        StudyListComponent,
        CategoryTableComponent,
        CategoryBarGraphComponent,
        SiteSelectComponent,
        CategoryPieGraphComponent,
        DashboardComponent,
        BorderComponent,
        SiteSponsSelectComponent,
        SiteSponsorPageComponent,
        CategoryBarGraphSegmentedComponent,
        DataVisualisationDeviationHomePageComponent,
        DataVisualisationDeviationsPageComponent,
        DataVisualisationDeviationsOverTimePageComponent,
        SiteStudyLevelSelectComponent,
        CategoryBarGraphSegmentedSiteComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        CoreModule,
        SharedModule,
        ChartModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        UserService,
        AuthService,
        StudyListService,
        CategoryBarGraphService,
        SiteSelectService,
        ShareSiteDataService,
        CategoryPieGraphService,
        CategoryBarGraphSegmentedService,
        SiteStudyLevelSelectService,
        CategoryBarGraphSegmentedSiteService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
    ]
})
export class AppModule { }
