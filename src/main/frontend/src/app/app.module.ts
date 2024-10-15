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
import { CategoryPieGraphComponent } from './category-pie-graph/category-pie-graph.component';
import { CategoryBarGraphSegmentedComponent } from './category-bar-graph-segmented/category-bar-graph-segmented.component';
import { SiteSelectComponent } from './site-select/site-select.component';
import { SiteStudyLevelSelectComponent } from './site-study-level-select/site-study-level-select.component';
import { SiteSponsSelectComponent } from './site-spons-select/site-spons-select.component';
import { SiteSponsorPageComponent } from './site-sponsor-page/site-sponsor-page.component';

import { UserService } from './user/user.service';
import { AuthService } from './user/auth.service';
import { StudyListService } from './study-list/study-list.service';
import { CategoryPieGraphService } from './category-pie-graph/category-pie-graph.service';
import { CategoryBarGraphSegmentedService } from './category-bar-graph-segmented/category-bar-graph-segmented.service';
import { SiteSelectService } from './site-select/site-select.service';
import { ShareSiteDataService } from './site-select/share-site-data.service';
import { SiteStudyLevelSelectService } from './site-study-level-select/site-study-level-select.service';
import { ChartModule } from 'primeng/chart';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
        UserSelectionComponent,
        StudyListComponent,
        SiteSelectComponent,
        CategoryPieGraphComponent,
        SiteSponsSelectComponent,
        SiteSponsorPageComponent,
        CategoryBarGraphSegmentedComponent,
        SiteStudyLevelSelectComponent,
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
        SiteSelectService,
        ShareSiteDataService,
        CategoryPieGraphService,
        CategoryBarGraphSegmentedService,
        SiteStudyLevelSelectService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
    ],
    exports: [
        CategoryBarGraphSegmentedComponent
    ]
})
export class AppModule { }
