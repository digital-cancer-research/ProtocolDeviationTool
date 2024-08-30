import { Component, Input } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-site-team-data-select',
  templateUrl: './site-team-data-select.component.html',
  styleUrls: ['./site-team-data-select.component.css']
})
export class SiteTeamDataSelectComponent {
  @Input() team: any;
  currentTeam$ = this.userService.currentUserSelectedTeam$;
  constructor(private userService: UserService) { }
}
