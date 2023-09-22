import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { UserSelectionComponent } from './user/user-selection.component'

import { UploadService } from './upload/upload.service';
import { UserService } from './user/user.service';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    UserSelectionComponent,
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AppRoutingModule,
	FormsModule,
],
  providers: [
    UploadService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
