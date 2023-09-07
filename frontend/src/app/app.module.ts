import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';

import { UploadService } from './upload/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	AppRoutingModule,
],
  providers: [
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
