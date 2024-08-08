import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../user/auth.service';
import { User } from '../core/models/user.model';
import { Subscription } from 'rxjs';
import { Team } from '../core/models/team.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'DEFAULT PAGE TITLE';

  users: User[] = [];
  selectedUser: User | null = null;
  selectedTeam: Team | null = null;
  usersSubscription!: Subscription;
  selectedTeamSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.selectedTeamSubscription = this.userService.getCurrentUserSelectedTeam().subscribe((team) => {
      this.selectedTeam = team;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) this.usersSubscription.unsubscribe();
    if (this.selectedTeamSubscription) this.selectedTeamSubscription.unsubscribe();
  }

  onSelectUser(username: string): void {
    if (username === "") {
      this.selectedUser = null;
      this.userService.setCurrentUser(null);
      this.selectedTeam = null;
    }
    else {
      this.userService.getUserByUsername(username).subscribe((user) => {
        this.selectedUser = user;
        this.userService.setCurrentUser(this.selectedUser);
        this.authService.checkAdminRole(username).subscribe();
      })
    }
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }
}
