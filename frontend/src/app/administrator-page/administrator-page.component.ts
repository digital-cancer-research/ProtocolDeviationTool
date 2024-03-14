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

  showUserManagement() {
    this.isUserManagementVisible = true;
    this.isTeamManagementVisible = false;
  }

  showTeamManagement() {
    this.isUserManagementVisible = false;
    this.isTeamManagementVisible = true;
    
 	// Call initializeComponent() method of app-team-management component
    const teamManagementComponent: any = document.querySelector('app-team-management');
    if (teamManagementComponent) {
      teamManagementComponent.initializeComponent();
    }
  }

}