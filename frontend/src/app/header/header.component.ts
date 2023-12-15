import { Component, Input } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() pageTitle: string = 'DEFAULT PAGE TITLE';
  users: User[] = [];
  selectedUser: string | null = null;

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
    this.authService.checkAdminRole(username).subscribe();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
