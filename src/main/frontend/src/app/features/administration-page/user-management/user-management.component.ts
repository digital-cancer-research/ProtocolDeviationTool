import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { map, Observable, of, Subscription } from 'rxjs';
import { UserManagementData } from './models/user-management-data.model';
import { Team } from 'src/app/core/models/team.model';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
	roleNames$: Observable<string[]> = this.userManagementService.roleNames$;
	data$: Observable<UserManagementData[]> = this.userManagementService.userManagementData$;
	teams$: Observable<Team[]> = this.userManagementService.teams$.pipe(
		map((teams) => {
			return teams.map((team) => {
				return {
					teamId: team.teamId,
					teamName: team.teamName
				}
			})
		})
	);
	teams: Team[] = [];
	teamsSubscription!: Subscription;

	constructor(
		private userManagementService: UserManagementService
	) { }

	ngOnInit(): void {
		this.teamsSubscription = this.teams$.subscribe(((teams) => this.teams = teams));
	}

	ngOnDestroy(): void {
		if (this.teamsSubscription) {
			this.teamsSubscription.unsubscribe();
		}
	}
}
