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

import { AuditTrailManagementService } from './audit-trail-management/audit-trail-management.service';
import { SiteManagementService } from './site-management/site-management.service';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { UserManagementTableComponent } from './user-management/user-management-table/user-management-table.component';
import { TeamManagementFormComponent } from './team-management/team-management-form/team-management-form.component';
import { TeamManagementTableComponent } from './team-management/team-management-table/team-management-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamManagementEditDialogueComponent } from './team-management/team-management-edit-dialogue/team-management-edit-dialogue.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserManagementEditDialogueComponent } from './user-management/user-management-edit-dialogue/user-management-edit-dialogue.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { StudyManagementEditDialogueComponent } from './study-management/study-management-edit-dialogue/study-management-edit-dialogue.component';

@NgModule({
  declarations: [
    AdministrationPageComponent,
    AuditTrailManagementComponent,
    SiteManagementComponent,
    StudyManagementComponent,
    StudyManagementEditDialogueComponent,
    TeamManagementComponent,
    TeamManagementEditDialogueComponent,
    TeamManagementFormComponent,
    TeamManagementTableComponent,
    UserManagementComponent,
    UserManagementEditDialogueComponent,
    UserManagementFormComponent,
    UserManagementTableComponent,
  ],
  imports: [
    CommonModule,
    AdministrationPageRoutingModule,
    FormsModule,
    SharedModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    AuditTrailManagementService,
    SiteManagementService,
  ]
})
export class AdministrationPageModule {
  public static URL = "administration-page";
}
