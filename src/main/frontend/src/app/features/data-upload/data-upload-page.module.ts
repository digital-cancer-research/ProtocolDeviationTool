import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataUploadRoutingModule } from './data-upload-page-routing.module';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { DataCategorisationComponent } from './data-categorisation/data-categorisation.component';
import { DataTrailComponent } from './data-trail/data-trail.component';
import { DataUploadPageComponent } from './data-upload-page.component';
import { MatCardModule } from '@angular/material/card';
import { FileUploadComponent } from './data-upload/file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { PendingUploadsTableComponent } from './data-upload/pending-uploads-table/pending-uploads-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UploadErrorsTableComponent } from './data-upload/upload-errors-table/upload-errors-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { UploadedFilesTableComponent } from './data-upload/uploaded-files-table/uploaded-files-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AiStatementDialogueComponent } from './data-upload/ai-statement-dialogue/ai-statement-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileSelectComponent } from './data-categorisation/file-select/file-select.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AiStatementDialogueComponent,
    AuditTrailComponent,
    DataUploadPageComponent,
    DataUploadComponent,
    FileUploadComponent,
    PendingUploadsTableComponent,
    UploadErrorsTableComponent,
    UploadedFilesTableComponent,
    DataCategorisationComponent,
    FileSelectComponent,
    DataTrailComponent,
  ],
  imports: [
    CommonModule,
    DataUploadRoutingModule,
    FormsModule,
    SharedModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    NgxFileDropModule,
  ],
})
export class DataUploadModule {
  public static URL = "data-upload";
}
