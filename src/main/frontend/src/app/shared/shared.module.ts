import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { PageButtonComponent } from './page-button/page-button.component';
import { UploadComponent } from './upload/upload.component';
import { TabComponent } from './tab/tab.component';
import { FileListComponent } from './file-list/file-list.component';
import { UploadService } from './upload/upload.service';
import { FileListService } from './file-list/file-list.service';

@NgModule({
  declarations: [
    PageButtonComponent,
    TabComponent,
    UploadComponent,
    FileListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButton,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    PageButtonComponent,
    TabComponent,
    UploadComponent,
    FileListComponent
  ],
  providers: [
    UploadService,
    FileListService
  ]
})
export class SharedModule { }
