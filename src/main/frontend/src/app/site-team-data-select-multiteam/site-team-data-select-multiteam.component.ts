import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../core/models/team.model';
import { TeamService } from '../core/services/team.service';
import { UserService } from '../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-team-data-select-multiteam',
  templateUrl: './site-team-data-select-multiteam.component.html',
  styleUrls: ['./site-team-data-select-multiteam.component.css']
})
export class SiteTeamDataSelectMultiteamComponent implements OnInit, OnDestroy {
  @Input() teams: Team[] = [];
  searchTerm: string = '';
  teamToBeConfirmed: Team | null = null;
  selectedTeam: Team | null = null;
  selectedTeamSubscription!: Subscription;
  isTeamSelected: boolean = false;

  constructor(private userService: UserService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.selectedTeamSubscription = this.userService.currentUserSelectedTeam$.subscribe((team) => {
      this.selectedTeam = team;
      if (this.selectedTeam === null) {
        this.isTeamSelected = false;
      }
      else {
        this.isTeamSelected = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedTeamSubscription.unsubscribe();
  }

  confirmTeam(): void {
    if (this.teamToBeConfirmed !== null) {
      this.userService.setCurrentUserSelectedTeam(this.teamToBeConfirmed);
      this.isTeamSelected = true;
    }
  }

  get filteredTeams(): any[] {
    if (!this.searchTerm.trim()) {
      // If the search term is empty, return all teams
      return this.teams;
    } else {
      // Filter the teams based on the search term
      return this.teams.filter(team =>
        team.teamName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}