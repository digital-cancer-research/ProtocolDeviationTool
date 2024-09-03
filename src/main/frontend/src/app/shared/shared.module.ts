import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { PageButtonComponent } from './page-button/page-button.component';
import { UploadComponent } from './upload/upload.component';
import { TabComponent } from './tab/tab.component';
import { FileListComponent } from './file-list/file-list.component';
import { UploadService } from './upload/upload.service';
import { FileListService } from './file-list/file-list.service';
import { SingleSelectComponent } from './single-select/single-select.component';

@NgModule({
  declarations: [
    FileListComponent,
    PageButtonComponent,
    SingleSelectComponent,
    TabComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [
    FileListComponent,
    PageButtonComponent,
    SingleSelectComponent,
    TabComponent,
    UploadComponent,
  ],
  providers: [
    UploadService,
    FileListService
  ]
})
export class SharedModule { }
