import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Team } from 'src/app/core/new/services/models/team/team.model';
import { UserService } from 'src/app/core/new/services/user.service';
import { TeamService } from 'src/app/core/new/services/team.service';

/**
 * Component representing the site page.
 * 
 * The `SitePageComponent` displays user-specific information on the site page.
 * It fetches and subscribes to the current user's teams and handles proper 
 * cleanup of subscriptions to prevent memory leaks.
 * 
 * @export
 * @class SitePageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
	selector: 'app-site-page',
	templateUrl: './site-page.component.html',
	styleUrls: ['./site-page.component.css']
})
export class SitePageComponent implements OnInit {
	public static readonly URL = 'site';
	private readonly userService = inject(UserService);
	private readonly teamService = inject(TeamService);

	teams$ = this.userService.currentUser$.pipe(
		mergeMap(user => {
			if (user === null) {
				return [];
			} else {
				return this.userService.getUserTeams$(user.id);
			}
		})
	);
	teams: Team[] = [];

	/**
	 * Initialises the component by subscribing to the user's teams.
	 */
	ngOnInit(): void {
		this.teams$.subscribe(teams => {
			this.teams = teams;
			if (this.teams.length == 1) {
				this.teamService.currentTeamSubject.next(this.teams[0]);
			}
		});
	}
}
