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
  isAuditTrailVisible: boolean = false;

  showUserManagement() {
    this.isUserManagementVisible = true;
    this.isTeamManagementVisible = false;
    this.isSiteManagementVisible = false;
    this.isAuditTrailVisible = false;
  }

  showTeamManagement() {
    this.isUserManagementVisible = false;
    this.isTeamManagementVisible = true;
    this.isSiteManagementVisible = false;
    this.isAuditTrailVisible = false;
    
 	// Call initializeComponent() method of app-team-management component
    const teamManagementComponent: any = document.querySelector('app-team-management');
    if (teamManagementComponent) {
      teamManagementComponent.initializeComponent();
    }
  }
  
  showSiteManagement() {
	    this.isUserManagementVisible = false;
	    this.isTeamManagementVisible = false;
	    this.isSiteManagementVisible = true;
	    this.isAuditTrailVisible = false;
	  }
  
  showAuditTrail() {
	    this.isUserManagementVisible = false;
	    this.isTeamManagementVisible = false;
	    this.isSiteManagementVisible = false;
	    this.isAuditTrailVisible = true;
	  }

}