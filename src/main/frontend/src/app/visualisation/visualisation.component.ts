import { Component, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { VisualisationService } from './visualisation.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import { DimensionService } from '../services/dimension-service.service';
import * as d3 from 'd3';

@Component({
	selector: 'app-visualisation',
	templateUrl: './visualisation.component.html',
	styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent implements OnInit {
	totalRows!: number;
	selectedSiteId?: string;
	error: boolean = false;
	errorMessage: string = "Failed to load data for total count";

	constructor(
		private visualisationService: VisualisationService,
		private shareSiteDataService: ShareSiteDataService
	) { }

	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.selectedSiteId = siteId;
			this.fetchTotalRows();
		});
	}

	fetchTotalRows() {
		this.visualisationService.getTotalRows(this.selectedSiteId).subscribe(
			(data) => {
				this.totalRows = data;
			},
			(error) => {
				console.error('Error fetching total rows: ', error);
				this.error = true;
			}
		);
	}
}