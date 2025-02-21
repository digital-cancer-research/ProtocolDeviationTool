import { Component, inject, ViewChild } from '@angular/core';
import { TeamService } from 'src/app/core/new/services/team.service';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { UserManagementTableComponent } from './user-management-table/user-management-table.component';

/**
 * UserManagementComponent is responsible for managing the user management UI element of the application.
 * It handles the retrieval and display of users and teams.
 */
@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
	private readonly teamService = inject(TeamService);
	@ViewChild(UserManagementTableComponent) table!: UserManagementTableComponent;

	/** Array of role names. */
	roles = Object.keys(Role);

	/** Array of all available teams. */
	teams: Team[] = [];

	/**
	 * Initialises the component by loading the list of teams.
	 */
	constructor() {
		this.teamService.getTeams$().subscribe(teams => this.teams = teams);	
	}

	updateData() {
		this.table.updateData();
	}
}
