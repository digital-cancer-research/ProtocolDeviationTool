import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  users: any[] = []; // Replace 'any[]' with your user data structure
  roles: string[] = ['Admin', 'User']; // List of available roles
  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    // Load users and their roles
    this.loadUsers();
  }

  loadUsers(): void {
    // Make an API call to get users with their roles
    this.userManagementService.getUsersWithRoles().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  changeUserRole(userId: number, newRole: string): void {
	console.log('Change role for userId:', userId);
	console.log('New role:', newRole);
	  
	  // Map the selected role to the corresponding role ID
	const newRoleId = newRole === 'Admin' ? 1 : 2;
	console.log('New role id:', newRoleId);
  
    // Make an API call to change a user's role
    this.userManagementService.changeUserRole(userId, newRoleId).subscribe(() => {
      // Update the user's role in the local list
      const userToUpdate = this.users.find((user) => user.userId === userId);
      if (userToUpdate) {
        userToUpdate.roleId = newRoleId;
      }
    });
  }
}
