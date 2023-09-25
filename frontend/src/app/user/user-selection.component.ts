import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthService } from '../admin-button/auth.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
})

export class UserSelectionComponent implements OnInit {
  users: User[] = [];
  selectedUser: string | null = null;
  isAdmin = false; // Default to false

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the list of users when the component initializes
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  
  onUserSelected(): void {
  console.log('Selected user:', this.selectedUser);


  }


  onSelectUser(username: string): void {
    this.userService.setCurrentUser(username);
    this.selectedUser = username;
    
    console.log('Selected user:', this.selectedUser);
    // Debugging: Check the value of selectedUser
    console.log('isAdmin (before API call):', this.isAdmin);
    
    // Make an API call to check if the selected user is an admin
    this.authService.checkAdminRole(username).subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      
      // Debugging: Check the value of isAdmin after API call
      console.log('isAdmin (after API call):', this.isAdmin);
    });
  }
}
