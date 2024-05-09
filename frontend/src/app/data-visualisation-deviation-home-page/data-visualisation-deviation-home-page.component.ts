import { Component } from '@angular/core';
import { TeamManagementComponent } from '../team-management/team-management.component';

@Component({
  selector: 'app-data-visualisation-deviation-home-page',
  templateUrl: './data-visualisation-deviation-home-page.component.html',
  styleUrls: ['./data-visualisation-deviation-home-page.component.css']
})
export class DataVisualisationDeviationHomePageComponent {
  isUserManagementVisible: boolean = true;
  isTeamManagementVisible: boolean = false;
  isSiteManagementVisible: boolean = false;

  showUserManagement() {
    this.isUserManagementVisible = true;
    this.isTeamManagementVisible = false;
    this.isSiteManagementVisible = false;
  }

  showTeamManagement() {
    this.isUserManagementVisible = false;
    this.isTeamManagementVisible = true;
    this.isSiteManagementVisible = false;
    
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
	  }

}