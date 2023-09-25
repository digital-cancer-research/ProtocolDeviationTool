import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  users: any[] = []; // Replace 'any[]' with your user data structure
  roles: string[] = ['Admin', 'User']; // List of available roles
5
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
    // Make an API call to change a user's role
    this.userManagementService.changeUserRole(userId, newRole).subscribe(() => {
      // Update the user's role in the local list
      const userToUpdate = this.users.find((user) => user.id === userId);
      if (userToUpdate) {
        userToUpdate.role = newRole;
      }
    });
  }
}
