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

import { UploadService } from './upload/upload.service';
import { UserService } from './user/user.service';
import { AuthService  } from './user/auth.service';
import { UserManagementService } from './user-management/user-management.service';
import { FileListService } from './file-list/file-list.service';
import { StudyListService } from './study-list/study-list.service';
import { VisualisationService } from './visualisation/visualisation.service';
import { CategoryBarGraphService } from './category-bar-graph/category-bar-graph.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
