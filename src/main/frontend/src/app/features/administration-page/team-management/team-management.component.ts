import { Component } from '@angular/core';
import { TeamWithDetails } from 'src/app/core/models/team/team-with-details.model';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
	selector: 'app-team-management',
	templateUrl: './team-management.component.html',
	styleUrls: ['./team-management.component.css']
})

export class TeamManagementComponent {
	
	protected teams: TeamWithDetails[] = [];
	constructor(private teamService: TeamService) {
		this.fetchTeams();
	}

	onTeamCreationChange() {
		this.fetchTeams();
	}

	onDatabaseChange(updatedTeams: TeamWithDetails[]): void {
		this.teams = updatedTeams;
	}

	fetchTeams() {
		this.teamService.getTeams$(true).subscribe(teams => {
			this.teams = teams as TeamWithDetails[];
		});
	}
}