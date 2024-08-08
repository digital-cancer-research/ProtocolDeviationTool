import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Team } from '../core/models/team.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-site-page',
	templateUrl: './site-page.component.html',
	styleUrls: ['./site-page.component.css']
})
export class SitePageComponent implements OnInit, OnDestroy {
	selectedTeam: Team | null = null;
	selectedTeamSubscription!: Subscription;
	userTeams: Team[] = [];
	userTeamsSubscription!: Subscription;
	handleUserTeams(teams: any[]): void {
		this.userTeams = teams;
	}

	constructor(
		private userService: UserService,
	  ) { }

	ngOnInit(): void {
		this.selectedTeamSubscription = this.userService.getCurrentUserSelectedTeam().subscribe(team => {
			this.selectedTeam = team;
		})
		this.userTeamsSubscription = this.userService.getCurrentUserTeams().subscribe(teams => {
			this.userTeams = teams;
		}); 
	}

	ngOnDestroy(): void {
		if (this.selectedTeamSubscription) this.selectedTeamSubscription.unsubscribe();
		if (this.userTeamsSubscription) this.userTeamsSubscription.unsubscribe();
	}
}
