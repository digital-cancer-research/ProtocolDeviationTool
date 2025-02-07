import { Component, inject, OnInit } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { TeamService } from 'src/app/core/new/services/team.service';
import { DataVisualisationService } from '../../data-visualisation.service';
import { Team } from 'src/app/core/new/services/models/team/team.model';

/**
 * Component for displaying visualisation data on the dashboard.
 */
@Component({
	selector: 'app-visualisation',
	templateUrl: './visualisation.component.html',
	styleUrls: ['./visualisation.component.scss']
})
export class VisualisationComponent implements OnInit {
	private readonly teamService = inject(TeamService);
	private readonly dataVisualisationService = inject(DataVisualisationService);
	protected team: Team | null = null;
	protected teamPDs!: number;
	protected isLoading: boolean = true;
	protected error: boolean = false;
	protected errorMessage: string = "";
	private apiRequest = this.teamService.currentTeam$.pipe(
		mergeMap(team => {
			this.team = team;
			if (team === null) {
				return of(null);
			} else {
				return this.dataVisualisationService.getPdCount$(team.id);
			}
		})
	);

	/**
	 * Lifecycle hook that is called after Angular has initialised all data-bound properties.
	 */
	ngOnInit() {
		this.apiRequest.subscribe({
			next: (teamPDs) => {
				this.isLoading = false;
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