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

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch the list of users when the component initialises
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSelectUser(username: string): void {
    this.userService.setCurrentUser(username);
    this.selectedUser = username;
    this.authService.checkAdminRole(username).subscribe();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
