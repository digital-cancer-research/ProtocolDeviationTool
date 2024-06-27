import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-site-team-data-select-multiteam',
  templateUrl: './site-team-data-select-multiteam.component.html',
  styleUrls: ['./site-team-data-select-multiteam.component.css']
})
export class SiteTeamDataSelectMultiteamComponent {
	  @Input() teams: any[] = [];
	  searchTerm: string = '';
	  selectedTeams: { [teamId: number]: boolean } = {};
	  
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