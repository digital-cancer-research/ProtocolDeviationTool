import { Component, OnInit } from '@angular/core';
import { TeamManagementService } from './team-management.service';
import { Team } from './team.model';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})

export class TeamManagementComponent implements OnInit {
	  teams: any[] = [];
	  
	  // check if the form was submitted
	  formNotSubmitted: boolean = true;
	  
	  // Stores the new team name
	  newTeam: any = { teamName: '' };
	  
	  isTeamCreated: boolean = false;
	  
	  // Pagination properties
	  itemsPerPage: number = 8;
	  currentPage: number = 1;
	  pagedTeams: any[] = [];
	  disabledFirstButton: boolean = false;
	  disabledPreviousButton: boolean = false;
	  disabledNextButton: boolean = false;
	  disabledLastButton: boolean = false;
	  
	  sortedColumn: string = 'teamName'; // Default sorting column
	  sortDirection: 'asc' | 'desc' = 'asc';

	  constructor(private teamManagementService: TeamManagementService, private userService: UserService) {}

	  ngOnInit(): void {
	    this.getTeams();
	    this.updatePage();
	  }
	  
	  initializeComponent(): void {
		  this.getTeams();
		  this.updatePage();
		  }
	  
	  getTeams(): void {
		    // Make an API call to get teams
		    this.teamManagementService.getTeams().subscribe((data: any[]) => {
		        this.teams = data;
		    }, error => {
		        console.error('Error fetching teams:', error);
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
		  const newTeamName = team.editedTeamName;
		  console.log(newTeamName);
		  console.log(team.teamId);
		  console.log(team);
		  // Make an API call to change the team name
		  this.teamManagementService.changeTeamName(team.teamId, newTeamName).subscribe(() => {
		    // Update the team name locally after successful change
		    team.teamName = newTeamName;
		    // Disable editing mode
		    team.editing = false;
		  }, (error) => {
		    console.error('Error changing team name:', error);
		  });
		}


		
		deleteTeam(teamIdToDelete: number): void {
			  // Make an API call to delete the team
			  this.teamManagementService.deleteTeam(teamIdToDelete).subscribe(() => {
			    // Remove the deleted team from the local list
			    this.teams = this.teams.filter((team) => team.teamId !== teamIdToDelete);
			    this.ngOnInit();
			  }, (error) => {
			    console.error('Error deleting team:', error);
			  });
			}
		
		ChangeTeamName(): void {
			this.onAddTeamSubmit();
			this.getTeams();
		    this.updatePage();
			}

		
		onAddTeamSubmit(): void {
			  // Get the current user's username from the service
			  const currentUser: string | null = this.userService.getCurrentUser();

			  // Check if currentUser is null or undefined
			  if (currentUser) {
			    // Assign the username to newTeam
			    this.newTeam.username = currentUser;

			    // Get the userId only if the currentUser is not null
			    this.userService.getUserIdByUsername(currentUser).subscribe((userId: number) => {
			      // Assign the retrieved userId to newTeam
			      this.newTeam.userId = userId;

			      // Call the service to add a new team
			      console.log('New Team:', this.newTeam);
			      this.teamManagementService.addTeam(this.newTeam).subscribe(() => {
			        // Clear the form
			        this.newTeam = { teamName: '' };
			    	 // Refresh the team list after adding a new team
			        this.getTeams();
				    this.updatePage();
				    this.isTeamCreated = true;
			      }, (error) => {
			        console.error('Error adding new team:', error);
			      });
			    }, (error) => {
			      console.error('Failed to retrieve userId for the current user:', error);
			    });
			  } else {
			    console.error('No user is currently logged in.');
			  }
			}
		
		closePopup(): void {
		    // Method to close the popup and reset the isTeamCreated flag
		    this.isTeamCreated = false;
		  }


	  
	  
	}