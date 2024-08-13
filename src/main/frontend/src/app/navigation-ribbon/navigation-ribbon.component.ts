import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../core/services/user.service';

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

  buttons: { label: string, route: string }[] = [
    { label: 'STUDY ID', route: '/data-visualisation' },
    { label: 'ADMINISTRATOR', route: '/admin' },
    { label: 'TEAM SELECTION', route: '/site' },
    { label: 'DATA', route: '/data-upload' },
    { label: 'VISUALISATION', route: '/data-visualisation' }
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.userService.currentUser$.subscribe(
      (user) => {
        if (user?.userId) {
          this.userService.getUserTeamsByUserId(user.userId).subscribe(
            (team) => {
              this.isPartOfMultipleTeams = team.length > 1;
            })
        }
      })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  shouldDisplayButton(button: any): boolean {
    switch (button.label) {
      case 'STUDY ID':
        return this.isStudySelected;
      case 'ADMINISTRATOR':
        return this.isAdmin;
      case 'TEAM SELECTION':
        return this.isPartOfMultipleTeams;
      case 'DATA':
      case 'VISUALISATION':
        return true;
      default:
        return false;
    }
  }
}
