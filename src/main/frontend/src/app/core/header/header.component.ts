import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../../user/auth.service';
import { User } from '../models/user.model';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Team } from '../models/team.model';
import { NavigationEnd, Router } from '@angular/router';

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
  usernameSelected: string = "";
  urlPath$: Observable<string> = new Observable<string>();
  urlPathString: string = "";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.urlPath$ = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url)
    );

    this.urlPath$.subscribe((url => {
      this.urlPathString = url.split('/')[1];
      this.setPageTitle();
    }))

    this.usersSubscription = this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.selectedTeamSubscription = this.userService.currentUserSelectedTeam$.subscribe((team) => {
      this.selectedTeam = team;
    });

    this.userService.currentUser$.subscribe((user) => {
      if (user?.username !== undefined) {
        this.usernameSelected = user?.username;
        this.selectedUser = user;
      }
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
      this.userService.setCurrentUserSelectedTeam(null);
    }
    else {
      this.userService.getUserByUsername(username).subscribe(
        (user) => {
          if (user !== this.selectedUser) {
            this.selectedTeam = null;
            this.userService.setCurrentUserSelectedTeam(null);
          }
          this.selectedUser = user;
          this.userService.setCurrentUser(user);

          this.userService.getUserTeamsByUserId(this.selectedUser.userId).subscribe(
            (teams) => {
              if (teams.length === 1) {
                this.userService.setCurrentUserSelectedTeam(teams[0]);
                user.selectedTeam = teams[0];
                this.selectedTeam = teams[0];
              }
            })
          this.authService.checkAdminRole(username).subscribe();
        })
    }
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  setPageTitle() {
    switch (this.urlPathString) {
      case ('site'): {
        this.pageTitle = "SITE PAGE";
        break;
      }
      case ('data-upload'): {
        this.pageTitle = "DATA UPLOAD";
        break;
      }
      case ('data-visualisation'): {
        this.pageTitle = "TEAM SUMMARY DASHBOARD";
        break;
      }
      case ('data-visualisation-deviation-home'): {
        this.pageTitle = "<TEAM LEVEL> VISUALISATIONS";
        break;
      }
      case ('administration-page'): {
        this.pageTitle = "ADMINISTRATOR";
        break;
      }
      default: {
        this.pageTitle = "";
        break;
      }
    }
  }
}
