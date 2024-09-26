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

@NgModule({
  declarations: [
    DataUploadPageComponent,
    DataUploadComponent,
    AuditTrailComponent,
    DataCategorisationComponent,
    DataTrailComponent,
    DataUploadSummaryComponent
  ],
  imports: [
    CommonModule,
    DataUploadRoutingModule,
    SharedModule
  ],
})
export class DataUploadModule { }
