import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationPageComponent } from './administration-page.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { SiteManagementComponent } from './site-management/site-management.component';
import { AuditTrailManagementComponent } from './audit-trail-management/audit-trail-management.component';
import { StudyManagementComponent } from './study-management/study-management.component';
import { disabledPageGuard } from 'src/app/core/guards/disabled-page.guard';

const routes: Routes = [{
  path: '',
  component: AdministrationPageComponent,
  children: [
    { path: 'user-management', component: UserManagementComponent },
    { path: 'team-management', component: TeamManagementComponent },
    { path: 'site-management', component: SiteManagementComponent, canActivate: [disabledPageGuard] },
    { path: 'study-management', component: StudyManagementComponent },
    { path: 'audit-trail', component: AuditTrailManagementComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationPageRoutingModule { }
