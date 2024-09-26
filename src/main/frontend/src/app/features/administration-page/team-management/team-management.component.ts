import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TeamService } from 'src/app/core/services/team.service';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-team-management',
	templateUrl: './team-management.component.html',
	styleUrls: ['./team-management.component.css']
})

export class TeamManagementComponent implements OnInit {
	teams: any[] = [];
	newTeam: any = { teamName: '' };
	isTeamCreated: boolean = false;
	currentUser: User | null = null;;

	// Pagination properties
	itemsPerPage: number = 8;
	currentPage: number = 1;
	pagedTeams: any[] = [];
	disabledFirstButton: boolean = false;
	disabledPreviousButton: boolean = false;
	disabledNextButton: boolean = false;
	disabledLastButton: boolean = false;
	private _snackBar = inject(MatSnackBar);
	teamsSubscription!: Subscription;
	currentUserSubscription!: Subscription

	sortedColumn: string = 'teamName'; // Default sorting column
	sortDirection: 'asc' | 'desc' = 'asc';

	constructor(
		private userService: UserService,
		private teamService: TeamService,
	) { }

	ngOnInit(): void {
		this.teamsSubscription = this.teamService.teams$.subscribe({
			next: (teams: any[]) => {
				this.teams = teams;
				this.updatePage();
			},
			error: (error) => {
				console.error('Error fetching teams:', error);
			}
		});

		this.currentUserSubscription = this.userService.currentUser$.subscribe({
			next: (user) => {
				this.currentUser = user;
			},
			error: (error) => {
				console.error('Error fetching current user:', error)
			}
		});
	}

	ngOnDestroy() {
		if (this.teamsSubscription) { this.teamsSubscription.unsubscribe() };
		if (this.currentUserSubscription) { this.currentUserSubscription.unsubscribe() };
	}

	openSnackBar(message: string, action: string = "", duration: number = 3000) {
		this._snackBar.open(message, action, {
			duration: duration,
		});
	}

	getTeams(): void {
		this.teamService.teams$.subscribe({
			next: (data: any[]) => {
				this.teams = data;
				this.updatePage();
			},
			error: (error) => {
				console.error('Error fetching teams:', error);
			}
		});
	}

	updatePage(): void {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		this.pagedTeams = this.teams.slice(startIndex, startIndex + this.itemsPerPage);
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
		return Array.from({ length: Math.ceil(this.teams.length / this.itemsPerPage) }, (_, i) => i + 1);
	}

	sortTable(column: string): void {
		if (this.sortedColumn === column) {
			this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			this.sortedColumn = column;
			this.sortDirection = 'asc';
		}

		// Sort the entire dataset
		this.teams.sort((a, b) => {
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

	toggleEditing(team: any): void {
		// Set the initial value of editedTeamName to the current team name
		team.editedTeamName = team.teamName;
		// Toggle editing mode
		team.editing = !team.editing;
	}

	cancelEditing(team: any): void {
		// Reset the edited team name
		team.editedTeamName = team.teamName;
		// Disable editing mode
		team.editing = false;
	}

	submitTeamName(team: any): void {
		if (team.teamName !== team.editedTeamName) {
			const newTeamName = team.editedTeamName;
			this.teamService.changeTeamName(team.teamId, newTeamName).subscribe({
				next: () => {
					this.openSnackBar(`${team.teamName} has been changed to ${newTeamName}.`)
				},
				complete: () => {
					team.editing = false;
					team.teamName = newTeamName;
				},
				error: (response) => {
					console.error(response);
					this.openSnackBar(`There was an error editing ${team.teamName}.`, "", 5000);
				}
			});
		}
	}

	deleteTeam(teamIdToDelete: number): void {
		let deletedTeam = this.teams.filter((team) => team.teamId === teamIdToDelete)[0];
		this.teamService.deleteTeam(teamIdToDelete).subscribe({
			next: () => {
				this.openSnackBar(`${deletedTeam.teamName} has been deleted.`)
			},
			error: (response) => {
				this.openSnackBar(`There was an error trying to delete ${deletedTeam.teamName}.`, "", 5000)
			}
		});
	}

	changeTeamName(): void {
		this.onAddTeamSubmit();
		this.getTeams();
		this.updatePage();
	}

	onAddTeamSubmit(): void {
		if (this.currentUser) {
			this.newTeam.username = this.currentUser.username;
			this.newTeam.userId = this.currentUser.userId;
			this.teamService.addTeam(this.newTeam);
			this.teamService.addTeam(this.newTeam).subscribe({
				next: (response) => {
					this._snackBar.open(`${this.newTeam.teamName} created.`, "", {
						duration: 3000
					});
				},
				error: (response) => {
					console.error(response);
					this._snackBar.open(`There was an error creating ${this.newTeam.teamName}`, "", {
						duration: 5000
					});
				}
			});
		}
	}

	closePopup(): void {
		// Method to close the popup and reset the isTeamCreated flag
		this.isTeamCreated = false;
	}

}