import { Component, OnInit, OnChanges } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { UserAccount } from './user-account.model';
import { UserTeam } from './user-team.model';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit, OnChanges {
	users: any[] = [];
	roles: any[] = [];
	teams: any[] = [];
	userTeams: any[] = [];

	// check if the form was submitted
	formNotSubmitted: boolean = true;

	teamSearchTerm: string = ''; // Variable to store the search term
	filteredTeams: any[] = []; // Filtered list of teams based on search 

	userTeamSearchTerms: { [userId: number]: string } = {};
	filteredUserTeams: { [userId: number]: any[] } = {};

	// Stores the current new user selection - uses these values as default and resets to them
	newUser: UserAccount = { username: '', roleId: 2, teamId: [] };
	selectedTeams: number[] = [];

	// Initialise selectedUserTeams to store selected teams for each user
	selectedUserTeams: { [userId: number]: number[] } = {};

	// Pagination properties
	itemsPerPage: number = 4;
	currentPage: number = 1;
	pagedUsers: any[] = [];
	disabledFirstButton: boolean = false;
	disabledPreviousButton: boolean = false;
	disabledNextButton: boolean = false;
	disabledLastButton: boolean = false;

	sortedColumn: string = 'username'; // Default sorting column
	sortDirection: 'asc' | 'desc' = 'asc';

	constructor(private userManagementService: UserManagementService) { }

	ngOnInit(): void {
		// Load users and their roles
		this.loadUsers();
		this.loadUserTeams();
		this.getRoles();
		this.getTeams();

	}

	ngOnChanges(): void {
		this.initialiseFilteredUserTeams();
	}

	private initialiseFilteredUserTeams(): void {
		this.users.forEach(user => {
			this.userTeamSearchTerms[user.userId] = '';
			this.filteredUserTeams[user.userId] = this.teams;
		});
	}

	// Function to filter teams based on search term
	filterTeams(): void {
		this.filteredTeams = this.teams.filter(team =>
			team.teamName.toLowerCase().includes(this.teamSearchTerm.toLowerCase())
		);
	}

	filterUserTeams(userId: number): void {
		this.filteredUserTeams[userId] = this.teams.filter(team =>
			team.teamName.toLowerCase().includes(this.userTeamSearchTerms[userId].toLowerCase()));
	}

	getTeams(): void {
		// Make an API call to get teams
		this.userManagementService.getTeams().subscribe((data: any[]) => {
			this.teams = data;
			this.filteredTeams = data;
			// Initialise filteredTeams with all teams initially
			this.filteredTeams = this.teams;
			this.initialiseFilteredUserTeams();
		}, error => {
			console.error('Error fetching teams:', error);
		});
	}

	getRoles(): void {
		// Make an API call to get roles
		this.userManagementService.getRoles().subscribe((data: any[]) => {
			this.roles = data;
		}, error => {
			console.error('Error fetching roles:', error);
		});
	}


	loadUsers(): void {
		// Make an API call to get users with their roles
		this.userManagementService.getUsersWithRoles().subscribe((data: any[]) => {
			this.users = data;
			this.initSelectedUserTeams()
			this.initialiseFilteredUserTeams();
			this.updatePage();
		}, error => {
			console.error('Error fetching users:', error);
		});
	}

	loadUserTeams(): void {
		// Make an API call to get users with their teams
		this.userManagementService.getUserTeams().subscribe((data: any[]) => {
			this.userTeams = data;
			this.updatePage();

			// Initialise selectedUserTeams with default team selections
			this.initSelectedUserTeams();
			this.initialiseFilteredUserTeams();
		}, error => {
			console.error('Error fetching users:', error);
		});
	}

	updatePage(): void {
		this.initialiseFilteredUserTeams();
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		this.pagedUsers = this.users.slice(startIndex, startIndex + this.itemsPerPage);
	}

	setPage(page: number): void {
		this.currentPage = page;
		this.updateNavigationButtons();
		this.updatePage();
	}

	updateNavigationButtons(): void {
		this.disabledFirstButton = this.currentPage === 1;
		this.disabledPreviousButton = this.currentPage === 1;
		this.disabledNextButton = this.currentPage === this.pages.length;
		this.disabledLastButton = this.currentPage === this.pages.length;
	}


	get pages(): number[] {
		return Array.from({ length: Math.ceil(this.users.length / this.itemsPerPage) }, (_, i) => i + 1);
	}

	sortTable(column: string): void {
		if (this.sortedColumn === column) {
			this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			this.sortedColumn = column;
			this.sortDirection = 'asc';
		}

		// Sort the entire dataset
		this.users.sort((a, b) => {
			const aValue = a[this.sortedColumn];
			const bValue = b[this.sortedColumn];

			if (this.sortDirection === 'asc') {
				return aValue.localeCompare(bValue);
			} else {
				return bValue.localeCompare(aValue);
			}
		});

		// Update pagination after sorting
		this.setPage(this.currentPage);
	}

	toggleTeamSelection(userId: number, teamId: number): void {
		if (!this.selectedUserTeams[userId]) {
			this.selectedUserTeams[userId] = [];
		}
		const index = this.selectedUserTeams[userId].indexOf(teamId);
		if (index === -1) {
			// Add team if not already selected
			this.selectedUserTeams[userId].push(teamId);
		} else {
			// Remove team if already selected
			this.selectedUserTeams[userId].splice(index, 1);
		}
	}

	initSelectedUserTeams(): void {
		// Iterate through each user
		this.users.forEach(user => {
			const userId = user.userId;
			// Find teams that the user is part of
			const userTeams = this.userTeams.filter(team => team.userId === userId);
			// Extract team IDs from userTeams
			const teamIds = userTeams.map(team => team.teamId);
			// Assign team IDs to selectedUserTeams
			this.selectedUserTeams[userId] = teamIds;
		});
	}

	isTeamSelected(userId: number, teamId: number): boolean {
		return this.selectedUserTeams[userId] && this.selectedUserTeams[userId].includes(teamId);
	}

	updateUser(userId: number, roleName: string, selectedTeams: number[]): void {

		// Update user role first
		this.changeUserRole(userId, roleName);

		// Update user teams after the role change is completed
		const userTeam: UserTeam = {
			userId: userId,
			teamId: selectedTeams
		};
		this.changeUserTeam(userTeam);
	}


	changeUserRole(userId: number, newRole: string): void {
		// Find the role object corresponding to the newRole string
		const role = this.roles.find(role => role.roleName === newRole);

		if (role) {
			// Extract the roleId from the found role object
			const newRoleId = role.roleId;

			// Make an API call to change a user's role
			this.userManagementService.changeUserRole(userId, newRoleId).subscribe(() => {
				// Update the user's role in the local list
				const userToUpdate = this.users.find(user => user.userId === userId);
				if (userToUpdate) {
					userToUpdate.roleId = newRoleId;
					userToUpdate.roleName = newRole;
				}
			});
		} else {
			console.error(`Role ${newRole} not found.`);
		}
	}


	changeUserTeam(userTeam: UserTeam): void {
		// Make an API call to change a user's teams
		this.userManagementService.changeUserTeam(userTeam).subscribe(() => {
			// Update the user's teams in the local list
			const userToUpdate = this.users.find((user) => user.userId === userTeam.userId);
			if (userToUpdate) {
				userToUpdate.teamIds = userTeam.teamId;
			}
		});
	}

	// Function to handle changes in team selection for adding a new user
	onTeamSelectionChange(event: any, teamId: number): void {
		if (event.target.checked) {
			// Add the team if it's checked
			this.newUser.teamId.push(teamId);
		} else {
			// Remove the team if it's unchecked
			const index = this.newUser.teamId.indexOf(teamId);
			if (index !== -1) {
				this.newUser.teamId.splice(index, 1);
			}
		}
	}

	onAddUserSubmit(): void {
		// Call the service to add a new user
		this.userManagementService.addUserWithRoleTeam(this.newUser).subscribe(() => {
			// Refresh the user list after adding a new user
			this.formNotSubmitted = false;
			this.ngOnInit();

			// Clear the form
			this.newUser = { username: '', roleId: 2, teamId: [] };
			this.formNotSubmitted = false;
		});
	}
}