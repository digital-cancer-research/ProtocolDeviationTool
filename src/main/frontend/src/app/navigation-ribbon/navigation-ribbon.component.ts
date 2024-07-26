import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navigation-ribbon',
  templateUrl: './navigation-ribbon.component.html',
  styleUrls: ['./navigation-ribbon.component.css']
})
export class NavigationRibbonComponent implements OnInit {
  buttons: { label: string, route: string }[] = [{ label: 'STUDY ID', route: '/admin' }, 
                                                 { label: 'ADMINISTRATOR', route: '/admin' }, 
                                                 { label: 'TEAM SELECTION', route: '/site' },
                                                 { label: 'DATA', route: '/data-upload' },
                                                 { label: 'VISUALISATION', route: '/data-visualisation' }];

  isStudyIdSelected: boolean = false;
  isAdmin: boolean = false;
  isPartOfMultipleTeams: boolean = false;


  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.userService.isUserPartOfMultipleTeams$.subscribe((isPartOfMultipleTeams) => {
      this.isPartOfMultipleTeams = isPartOfMultipleTeams;
    })
  }
}