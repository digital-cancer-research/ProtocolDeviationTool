import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataUploadRoutingModule } from './data-upload-page-routing.module';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { DataCategorisationComponent } from './data-categorisation/data-categorisation.component';
import { DataTrailComponent } from './data-trail/data-trail.component';
import { DataUploadSummaryComponent } from './data-upload-summary/data-upload-summary.component';
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

@NgModule({
  declarations: [
    AuditTrailComponent,
    DataUploadPageComponent,
    DataUploadComponent,
    FileUploadComponent,
    PendingUploadsTableComponent,
    UploadErrorsTableComponent,
    DataCategorisationComponent,
    DataTrailComponent,
    DataUploadSummaryComponent
  ],
  imports: [
    CommonModule,
    DataUploadRoutingModule,
    SharedModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
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
