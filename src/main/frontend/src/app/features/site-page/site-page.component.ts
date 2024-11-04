import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Team } from '../../core/models/team.model';
import { Subscription } from 'rxjs';

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
export class SitePageComponent implements OnInit, OnDestroy {
	public static readonly URL = 'site';
	userTeams: Team[] = [];
	userTeamsSubscription!: Subscription;

	constructor(
		private userService: UserService,
	  ) { }

	ngOnInit(): void {
		this.userTeamsSubscription = this.userService.getCurrentUserTeams().subscribe(teams => {
			this.userTeams = teams;
		}); 
	}

	ngOnDestroy(): void {
		if (this.userTeamsSubscription) this.userTeamsSubscription.unsubscribe();
	}
}
