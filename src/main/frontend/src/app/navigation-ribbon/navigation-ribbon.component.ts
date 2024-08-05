import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';
import { SiteStudyLevelSelectService } from '../site-study-level-select/site-study-level-select.service';

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
  // studyIdSubscription!: Subscription;
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
    // private siteStudyLevelSelectService: SiteStudyLevelSelectService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.userSubscription = this.userService.isUserPartOfMultipleTeams$.subscribe((isPartOfMultipleTeams) => {
      this.isPartOfMultipleTeams = isPartOfMultipleTeams;
    });

    // this.studyIdSubscription = this.siteStudyLevelSelectService.selectedStudyIdObservable$.subscribe((studyId: string) => {
    //   this.studyId = studyId;
    //   if (studyId !== "") {
    //     this.buttons[0].label = `STUDY ID: ${this.studyId}`;
    //   } else {
    //     this.buttons[0].label = `STUDY ID`;
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
    // if (this.studyIdSubscription) this.studyIdSubscription.unsubscribe();
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
