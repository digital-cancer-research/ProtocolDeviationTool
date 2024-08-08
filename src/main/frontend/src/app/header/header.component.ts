import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user.model';
import { Subscription } from 'rxjs';
import { UserTeam } from '../user-management/user-team.model';
import { UserManagementService } from '../user-management/user-management.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'DEFAULT PAGE TITLE';
  @Output() userTeamsSelected: EventEmitter<any[]> = new EventEmitter<any[]>();
  users: User[] = [];
  selectedUser: string | null = null;
  selectedUserTeams: UserTeam[] | null = null;
  userIdSubscription!: Subscription;
  userTeamsSubscription!: Subscription;
  currentUserSubscription!: Subscription;
  allTeamsSubscription!: Subscription;
  currentUserId!: number;
  teams!: any[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    // Fetch the list of users when the component initializes
    this.currentUserSubscription = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.allTeamsSubscription = this.userManagementService.getTeams().subscribe((teams) => {
      this.teams = teams;
    })
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
    if (this.userTeamsSubscription) this.userTeamsSubscription.unsubscribe();
    if (this.currentUserSubscription) this.currentUserSubscription.unsubscribe();
    if (this.allTeamsSubscription) this.allTeamsSubscription.unsubscribe();
  }

  onSelectUser(username: string): void {
    this.userService.setCurrentUser(username);
    this.selectedUser = username;
    this.subscribeToUserIdandTeams(username);
    this.authService.checkAdminRole(username).subscribe();
  }

  subscribeToUserIdandTeams(username: string) {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
    this.userIdSubscription = this.userService.getUserIdByUsername(username).subscribe((userId) => {
      this.currentUserId = userId;
      this.subscribeToUserTeams(username);
    });
  }

  subscribeToUserTeams(username: string) {
    if (this.userTeamsSubscription) this.userTeamsSubscription.unsubscribe();
    this.userTeamsSubscription = this.userService.getCurrentUserTeams(this.currentUserId).subscribe((selectedUserTeams) => {
      this.selectedUserTeams = selectedUserTeams;
    })
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

  get selectedUserTeamsAsString(): string {
    let selectedUserTeamsId = this.selectedUserTeams?.flatMap(currentTeam => currentTeam.teamId);
    if (selectedUserTeamsId !== undefined) {
      let userSelectedTeams = "";
      try {
        for (let index of selectedUserTeamsId) {
          userSelectedTeams += this.teams[index].teamName + ", ";
        }
        return userSelectedTeams.trimEnd().substring(0, userSelectedTeams.length - 2);
      }
      catch {
        return "";
      }
    }
    return "";
  }
}
