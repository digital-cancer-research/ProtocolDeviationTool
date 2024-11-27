import { Component, inject, OnInit } from '@angular/core';
import { VisualisationService } from './visualisation.service';
import { UserService } from 'src/app/core/services/user.service';
import { mergeMap, of } from 'rxjs';
import { Team } from 'src/app/core/models/team.model';

@Component({
	selector: 'app-visualisation',
	templateUrl: './visualisation.component.html',
	styleUrls: ['./visualisation.component.scss']
})
export class VisualisationComponent implements OnInit {
	private readonly userService = inject(UserService);
	private apiRequest = this.userService.currentUserSelectedTeam$.pipe(
		mergeMap(team => {
			this.team = team;
			if (team === null) {
				return of(null);
			} else {
				return this.visualisationService.getPDsForTeam(team.teamId);
			}
		})
	);
	protected team: Team | null = null;
	teamPDs!: number;
	isLoading: boolean = true;
	error: boolean = false;
	errorMessage: string = "";

	constructor(
		private visualisationService: VisualisationService,
	) { }

	ngOnInit() {

		this.apiRequest.subscribe({
			next: (teamPDs) => {
				this.isLoading = true;
				this.teamPDs = 0;
				if (teamPDs) {
					this.teamPDs = teamPDs;
				}
				else if (!this.team) {
					this.error = true;
					this.errorMessage = "No team selected";
				}
			},
			error: (error) => {
				this.errorMessage = "Failed to load data for total count";
				console.error(error);
				this.error = true;
				this.isLoading = false;
			}
		})
	}
}