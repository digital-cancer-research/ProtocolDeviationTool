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
	  
	  get isAdminValue() {
		  return this.isAdmin;
	  }
}
