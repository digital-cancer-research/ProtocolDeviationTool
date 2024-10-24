import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { PageButtonComponent } from './page-button/page-button.component';
import { UploadComponent } from './upload/upload.component';
import { TabComponent } from './tab/tab.component';
import { FileListComponent } from './file-list/file-list.component';
import { MultiSelectComponent } from './select/multi-select/multi-select.component';
import { UploadService } from './upload/upload.service';
import { FileListService } from './file-list/file-list.service';
import { SingleSelectComponent } from './select/single-select/single-select.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { StudyDataTableComponent } from './study-data-table/study-data-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';

@NgModule({
  declarations: [
    FileListComponent,
    CategoryTableComponent,
    MultiSelectComponent,
    PageButtonComponent,
    SingleSelectComponent,
    TabComponent,
    UploadComponent,
    StudyDataTableComponent,
    SentenceCasePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule, 
    MatFormFieldModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule
  ],
  exports: [
    FileListComponent,
    CategoryTableComponent,
    MultiSelectComponent,
    PageButtonComponent,
    SingleSelectComponent,
    TabComponent,
    UploadComponent,
    StudyDataTableComponent,
    SentenceCasePipe
  ],
  providers: [
    UploadService,
    FileListService
  ]
})
export class SharedModule { }
