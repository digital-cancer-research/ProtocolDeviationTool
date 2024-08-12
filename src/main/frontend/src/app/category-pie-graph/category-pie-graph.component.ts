import { Component, OnInit } from '@angular/core';
import { CategoryPieGraphService } from './category-pie-graph.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';

@Component({
	selector: 'app-category-pie-graph',
	templateUrl: './category-pie-graph.component.html',
	styleUrls: ['./category-pie-graph.component.css']
})
export class CategoryPieGraphComponent implements OnInit {

	selectedSiteId?: string;
	data: any;
	error: boolean = false;

	constructor(
		private categoryPieGraphService: CategoryPieGraphService,
		private shareSiteDataService: ShareSiteDataService
	) { }

	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.selectedSiteId = siteId;
			this.loadEntryCountPerStudy();
		});
	}

	loadEntryCountPerStudy() {
		this.categoryPieGraphService.getEntryCountPerStudy(this.selectedSiteId).subscribe(
			data => {
				this.data = {
					labels: data.map((entry) => entry.studyId),
					datasets: [{
						data: data.map((entry) => entry.entryCount)
					}]
				};
				this.error = false;
			},
			error => {
				error = true;
				console.error('Error loading data for pie graph: ', error);
			});

	}
}
