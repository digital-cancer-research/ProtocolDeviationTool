import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../core/models/team.model';
import { UserService } from '../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-site-team-data-select-multiteam',
	templateUrl: './site-team-data-select-multiteam.component.html',
	styleUrls: ['./site-team-data-select-multiteam.component.css']
})
export class SiteTeamDataSelectMultiteamComponent implements OnInit {
  @Input() teams: Team[] = [];
  selectedTeam: Team | null = null;
  selectedTeamSubscription!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.selectedTeamSubscription = this.userService.currentUserSelectedTeam$.subscribe((team) => {
      this.selectedTeam = team;
      console.log("Fetching selected team");
      console.log(team);
    });
    this.selectedTeamSubscription.unsubscribe();
  }

  setTeam(team: Team | null): void {
    console.log("SETTING TEAM");
    console.log(team);
    if (team) {
      this.userService.currentUserSelectedTeamSubject.next(team);
    }
  }
}