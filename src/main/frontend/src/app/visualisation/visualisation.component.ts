import { Component, OnInit } from '@angular/core';
import { VisualisationService } from './visualisation.service';

@Component({
	selector: 'app-visualisation',
	templateUrl: './visualisation.component.html',
	styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {
	teamPDs!: number;
	isLoading: boolean = true;
	error: boolean = false;
	errorMessage: string = "Failed to load data for total count";

	constructor(
		private visualisationService: VisualisationService,
	) { }

	ngOnInit() {
		this.visualisationService.getPDsForCurrentTeam().subscribe({
			next: (teamPDs) => {
				this.isLoading = true;
				setTimeout(() => {
						if (teamPDs) {
							this.teamPDs = teamPDs;
							this.isLoading = false;
						}
						else {
							this.teamPDs = 0;
							this.isLoading = false;
						}
					}, 1000);
			},
			error: (error) => {
				setTimeout(
					() => {
						console.error("There was an error fetching the number of PDs");
						console.error(error);
						this.error = true;
						this.isLoading = false;
					}, 1000);
			}
		})
	}
}