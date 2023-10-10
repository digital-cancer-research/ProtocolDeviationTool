import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { UserAccount } from './user-account.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  roles: string[] = ['Admin', 'User'];
  newUser: UserAccount = { username: '', roleId: 2, isSite: false, isSponsor: false };
  constructor(private userManagementService: UserManagementService) {}
  roleMappings: { [key: number]: string } = {
    1: 'Admin',
    2: 'User',
  };

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
	  
	  // Map the selected role to the corresponding role id
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
  
  onAddUserSubmit(): void {
  
    // Call the service to add a new user
    this.userManagementService.addUserWithRole(this.newUser).subscribe(() => {
      // Refresh the user list after adding a new user
      this.loadUsers();

      // Clear the form
      this.newUser = { username: '', roleId: 2, isSite: false, isSponsor: false };
    });
  }
}
