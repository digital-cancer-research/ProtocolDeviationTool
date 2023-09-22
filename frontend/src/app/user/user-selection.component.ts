import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
})

export class UserSelectionComponent implements OnInit {
  users: User[] = [];
  selectedUser: string | null = null;

  constructor(private userService: UserService) {}

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
  }
}
