import { Component, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() userTeamsSelected: EventEmitter<any[]> = new EventEmitter<any[]>();
  users: User[] = [];
  selectedUser: string | null = null;
  selectedUserTeams: any[] | null = null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the list of users when the component initializes
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  
  onSelectUser(username: string): void {
    this.userService.setCurrentUser(username);
    this.selectedUser = username;
    

 	// Fetch the user ID of the selected user
    this.userService.getUserIdByUsername(username).subscribe(
      (userId) => {
        // Fetch the teams of the selected user using the obtained user ID
        this.loadSelectedUserTeams(userId);
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
    this.authService.checkAdminRole(username).subscribe();
    this.userService.checkIfUserIsPartOfMultipleTeams(username).subscribe();
  }
  
  loadSelectedUserTeams(userId: number): void {
	    this.userService.getCurrentUserTeams(userId).subscribe(
	      (userTeams) => {
	    	// Emit the selected user's teams to the parent component
	          this.userTeamsSelected.emit(userTeams);
	      },
	      (error) => {
	        console.error('Error fetching user teams:', error);
	      }
	    );
	  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
