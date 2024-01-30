import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { UserAccount } from './user-account.model';
import { UserTeam } from './user-team.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
	  users: any[] = [];
	  roles: any[] = [];
	  teams: any[] = [];
	  userTeams: any[] = [];
	  newUser: UserAccount = { username: '', roleId: 2, teamId: [], isSite: false, isSponsor: false };
	  selectedTeams: number[] = [];
	  
	  // Initialize selectedUserTeams to store selected teams for each user
	  selectedUserTeams: { [userId: number]: number[] } = {};

	  // Pagination properties
	  itemsPerPage: number = 3;
	  currentPage: number = 1;
	  pagedUsers: any[] = [];

	  constructor(private userManagementService: UserManagementService) {}

	  ngOnInit(): void {
	    // Load users and their roles
	    this.loadUsers();
	    this.loadUserTeams();
	    this.getRoles();
	    this.getTeams();
	  }
	  
	  getTeams(): void {
		    console.log('Fetching teams');
		    // Make an API call to get teams
		    this.userManagementService.getTeams().subscribe((data: any[]) => {
		        console.log('Received data:', data);
		        this.teams = data;
		    }, error => {
		        console.error('Error fetching teams:', error);
		    });
		}
	  
	  getRoles(): void {
		    console.log('Fetching roles');
		    // Make an API call to get roles
		    this.userManagementService.getRoles().subscribe((data: any[]) => {
		        console.log('Received data:', data);
		        this.roles = data;
		    }, error => {
		        console.error('Error fetching roles:', error);
		    });
		}


	  loadUsers(): void {
		    console.log('Fetching users with roles');
		    // Make an API call to get users with their roles
		    this.userManagementService.getUsersWithRoles().subscribe((data: any[]) => {
		        console.log('Received data:', data);
		        this.users = data;
		        this.updatePage();
		    }, error => {
		        console.error('Error fetching users:', error);
		    });
		}
	  
	  loadUserTeams(): void {
		    console.log('Fetching users with teams');
		    // Make an API call to get users with their teams
		    this.userManagementService.getUserTeams().subscribe((data: any[]) => {
		        console.log('Received data:', data);
		        this.userTeams = data;
		        this.updatePage();
		    }, error => {
		        console.error('Error fetching users:', error);
		    });
		}

	  // Function to check if the user is in the team
	  isUserInTeam(userId: number, teamId: number): boolean {
	      // Check if the user is in the team
	      return this.userTeams.some(team => team.userId === userId && team.teamId === teamId);
	  }


	  updatePage(): void {
	    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
	    this.pagedUsers = this.users.slice(startIndex, startIndex + this.itemsPerPage);
	  }

	  setPage(page: number): void {
	    this.currentPage = page;
	    this.updatePage();
	  }
	  
	  get pages(): number[] {
		  return Array.from({ length: Math.ceil(this.users.length / this.itemsPerPage) }, (_, i) => i + 1);
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

	  
	  changeUserTeam(userId: number, newTeamIds: number[]): void {
		    // Make an API call to change a user's teams
		    this.userManagementService.changeUserTeam(userId, newTeamIds).subscribe(() => {
		        // Update the user's teams in the local list
		        const userToUpdate = this.users.find((user) => user.userId === userId);
		        if (userToUpdate) {
		            userToUpdate.teamIds = newTeamIds;
		        }
		    });
		}

	  onAddUserSubmit(): void {
	    // Call the service to add a new user
	    this.userManagementService.addUserWithRoleTeam(this.newUser).subscribe(() => {
	      // Refresh the user list after adding a new user
	      this.loadUsers();

	      // Clear the form
	      this.newUser = { username: '', roleId: 2, teamId: [], isSite: false, isSponsor: false };
	    });
	  }
	}