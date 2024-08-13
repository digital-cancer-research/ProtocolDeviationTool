import { Component } from '@angular/core';
import { TeamManagementComponent } from '../team-management/team-management.component';

@Component({
  selector: 'app-administrator-page',
  templateUrl: './administrator-page.component.html',
  styleUrls: ['./administrator-page.component.css']
})
export class AdministratorPageComponent {
  isUserManagementVisible: boolean = true;
  isTeamManagementVisible: boolean = false;
  isSiteManagementVisible: boolean = false;
  isAuditTrailManagementVisible: boolean = false;

  showUserManagement() {
    this.isUserManagementVisible = true;
    this.isTeamManagementVisible = false;
    this.isSiteManagementVisible = false;
    this.isAuditTrailManagementVisible = false;
  }

  showTeamManagement() {
    this.isUserManagementVisible = false;
    this.isTeamManagementVisible = true;
    this.isSiteManagementVisible = false;
    this.isAuditTrailManagementVisible = false;

    // Call initialiseComponent() method of app-team-management component
    const teamManagementComponent: any = document.querySelector('app-team-management');
    if (teamManagementComponent) {
      teamManagementComponent.initialiseComponent();
    }
  }

  showSiteManagement() {
    this.isUserManagementVisible = false;
    this.isTeamManagementVisible = false;
    this.isSiteManagementVisible = true;
    this.isAuditTrailManagementVisible = false;
  }

  showAuditTrailManagement() {
    this.isUserManagementVisible = false;
    this.isTeamManagementVisible = false;
    this.isSiteManagementVisible = false;
    this.isAuditTrailManagementVisible = true;
  }

}