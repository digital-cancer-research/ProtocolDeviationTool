import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationPageRoutingModule } from './administration-page-routing.module';
import { AdministrationPageComponent } from './administration-page.component';
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AuditTrailManagementComponent } from './audit-trail-management/audit-trail-management.component';
import { SiteManagementComponent } from './site-management/site-management.component';
import { StudyManagementComponent } from './study-management/study-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministrationDataService } from './administration-data.service';
import { AuditTrailManagementService } from './audit-trail-management/audit-trail-management.service';
import { SiteManagementService } from './site-management/site-management.service';
import { TeamManagementService } from './team-management/team-management.service';
import { UserManagementService } from './user-management/user-management.service';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { UserManagementTableComponent } from './user-management/user-management-table/user-management-table.component';

@NgModule({
  declarations: [
    AdministrationPageComponent,
    AuditTrailManagementComponent,
    SiteManagementComponent,
    StudyManagementComponent,
    TeamManagementComponent,
    UserManagementComponent,
    UserManagementFormComponent,
    UserManagementTableComponent,
  ],
  imports: [
    CommonModule,
    AdministrationPageRoutingModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [
    AdministrationDataService,
    AuditTrailManagementService,
    SiteManagementService,
    TeamManagementService,
    UserManagementService
  ]
})
export class AdministrationPageModule { 
  public static URL = "administration-page" ;
}
