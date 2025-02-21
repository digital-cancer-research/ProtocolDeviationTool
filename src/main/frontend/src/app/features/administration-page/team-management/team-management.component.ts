import { Component, ViewChild } from '@angular/core';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { TeamService } from 'src/app/core/new/services/team.service';
import { TeamManagementTableComponent } from './team-management-table/team-management-table.component';
import { TeamManagementFormComponent } from './team-management-form/team-management-form.component';

@Component({
	selector: 'app-team-management',
	templateUrl: './team-management.component.html',
	styleUrls: ['./team-management.component.css']
})

export class TeamManagementComponent {
	@ViewChild(TeamManagementFormComponent) form!: TeamManagementFormComponent;
	@ViewChild(TeamManagementTableComponent) table!: TeamManagementTableComponent;
	
	onTeamCreationChange() {
		this.table.ngAfterViewInit();
	}

	onDatabaseChange(updatedTeams: TeamWithDetails[]): void {
		this.form.getTeams(updatedTeams);
	}

}