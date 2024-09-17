import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../user/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation-ribbon',
  templateUrl: './navigation-ribbon.component.html',
  styleUrls: ['./navigation-ribbon.component.css']
})
export class NavigationRibbonComponent implements OnDestroy {
  isAdmin: boolean = false;
  isPartOfMultipleTeams: boolean = false;
  isStudySelected: boolean = false;
  authSubscription!: Subscription;
  userSubscription!: Subscription;

  links: Link[] = [
    { label: '', route: '', visible: true, disabled: false },
    { label: 'ADMINISTRATION', route: '/administration-page/user-management', visible: () => this.isAdmin, disabled: false },
    { label: 'TEAM SELECTION', route: '/site', visible: () => this.isPartOfMultipleTeams, disabled: false },
    { label: 'DATA', route: '/data-upload', visible: true, disabled: false },
    { label: 'VISUALISATION', route: '/data-visualisation', visible: true, disabled: false }
  ];
  activeLink = this.links[0];
  isUserDeactivated: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.userService.currentUser$.subscribe(
      (user) => {
        if (user) {
          this.authService.checkAdminRole(user.username).subscribe(
            (isAdmin) => {
              this.isAdmin = isAdmin;
            }
          );
          this.userService.getUserTeamsByUserId(user.userId).subscribe(
            (team) => {
              this.isPartOfMultipleTeams = team.length > 1;
              this.activeLink = this.links[2];
            });
          this.userService.currentUserSelectedTeam$.subscribe(
            (team) => {
              if (team !== null) {
                this.links[4].disabled = false;
              } else {
                this.links[4].disabled = true;
              }
            }
          )
          if (user.roleId === 3) {
            this.isUserDeactivated = true;
          } else {
            this.isUserDeactivated = false;
          }
        }
      })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  get filteredLinks() {
    return this.links.filter(link => typeof link.visible === 'function' ? 
      link.visible() : link.visible);
  }
}

interface Link {
  label: string
  route: string
  visible: boolean | (() => boolean)
  disabled: boolean
}