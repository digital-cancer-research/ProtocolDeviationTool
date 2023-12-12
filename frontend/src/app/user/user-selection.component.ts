import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthService } from './auth.service';

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
    
    // Make an API call to check if the selected user is an admin
    this.authService.checkAdminRole(username).subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
}
