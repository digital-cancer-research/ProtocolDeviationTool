import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../user/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation-ribbon',
  templateUrl: './navigation-ribbon.component.html',
  styleUrls: ['./navigation-ribbon.component.css']
})
export class NavigationRibbonComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isPartOfMultipleTeams: boolean = false;
  isStudySelected: boolean = false;
  studyId: string = "";
  authSubscription!: Subscription;
  userSubscription!: Subscription;

  links: Link[] = [
    { label: '', route: '', visible: true },
    { label: 'ADMINISTRATION', route: '/administration-page/user-management', visible: true },
    { label: 'TEAM SELECTION', route: '/site', visible: true },
    { label: 'DATA', route: '/data-upload', visible: true },
    { label: 'VISUALISATION', route: '/data-visualisation', visible: true }
  ];
  activeLink = this.links[0];
  disabled: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(
      (user) => {
        if (user) {
          this.authService.checkAdminRole(user.username).subscribe(
            (isAdmin) => {
              isAdmin ?
                this.links[0].visible = true :
                this.links[0].visible = false;
            }
          );
          this.userService.getUserTeamsByUserId(user.userId).subscribe(
            (team) => {
              team.length > 1 ?
                this.links[1].visible = true :
                this.links[1].visible = false;
            });
          if (user.roleId === 3) {
            this.disabled = true;
          } else {
            this.disabled = false;
          }
        }
      })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  get filteredLinks() {
    return this.links.filter(link => link.visible);
  }
}

interface Link {
  label: string
  route: string
  visible: boolean
}