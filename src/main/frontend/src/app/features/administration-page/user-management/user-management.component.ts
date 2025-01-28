import { Component, inject } from '@angular/core';
import { TeamService } from 'src/app/core/new/services/team.service';
import { Role } from 'src/app/core/new/services/models/user/role.enum';
import { UserService } from 'src/app/core/new/services/user.service';
import { Team } from 'src/app/core/new/services/models/team/team.model';

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
	private readonly userService = inject(UserService);
	private readonly teamService = inject(TeamService);

	/** Array of role names. */
	roles = Object.keys(Role);

	/** Observable for users with their associated teams. */
	data$ = this.userService.getUsersWithTeams$();

	/** Array of all available teams. */
	teams: Team[] = [];

	/**
	 * Initialises the component by loading the list of teams.
	 */
	constructor() {
		this.teamService.getTeams$().subscribe(teams => this.teams = teams);	
	}
}
