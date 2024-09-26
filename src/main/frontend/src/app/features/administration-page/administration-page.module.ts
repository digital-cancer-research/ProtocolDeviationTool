import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationPageRoutingModule } from './administration-page-routing.module';
import { AdministrationPageComponent } from './administration-page.component';
import { SharedModule } from "../../shared/shared.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuditTrailManagementComponent } from './audit-trail-management/audit-trail-management.component';
import { SiteManagementComponent } from './site-management/site-management.component';
import { StudyManagementComponent } from './study-management/study-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule } from '@angular/forms';

import { AdministrationDataService } from './administration-data.service';
import { AuditTrailManagementService } from './audit-trail-management/audit-trail-management.service';
import { SiteManagementService } from './site-management/site-management.service';
import { TeamManagementService } from './team-management/team-management.service';
import { UserManagementService } from './user-management/user-management.service';

@NgModule({
  declarations: [
    AdministrationPageComponent,
    AuditTrailManagementComponent,
    SiteManagementComponent,
    StudyManagementComponent,
    TeamManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AdministrationPageRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [
    AdministrationDataService,
    AuditTrailManagementService,
    SiteManagementService,
    TeamManagementService,
    UserManagementService
  ]
})
export class AdministrationPageModule { }
