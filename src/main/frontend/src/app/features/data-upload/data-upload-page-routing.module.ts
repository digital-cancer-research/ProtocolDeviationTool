import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { DataUploadSummaryComponent } from './data-upload-summary/data-upload-summary.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { DataTrailComponent } from './data-trail/data-trail.component';
import { DataCategorisationComponent } from './data-categorisation/data-categorisation.component';
import { DataUploadPageComponent } from './data-upload-page.component';

const routes: Routes = [{
  path: '',
  component: DataUploadPageComponent,
  children: [
    { path: '', component: DataUploadComponent },
    { path: 'summary', component: DataUploadSummaryComponent },
    { path: 'audit-trail', component: AuditTrailComponent },
    { path: 'data-trail', component: DataTrailComponent },
    { path: 'data-categorisation', component: DataCategorisationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataUploadRoutingModule { }
