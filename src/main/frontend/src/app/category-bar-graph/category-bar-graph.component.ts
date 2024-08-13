import { Component, HostListener, OnInit } from '@angular/core';
import { CategoryBarGraphService } from './category-bar-graph.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import * as d3 from 'd3';
import { DimensionService } from '../services/dimension-service.service';

@Component({
	selector: 'app-category-bar-graph',
	templateUrl: './category-bar-graph.component.html',
	styleUrls: ['./category-bar-graph.component.css']
})
export class CategoryBarGraphComponent implements OnInit {

	width: number = 0;
	height: number = 0;
	selectedSiteId?: string;
	data: any;
	error: boolean = false;
	options = {
		indexAxis: 'y',
		plugins: {
			title: {
				display: true,
				text: 'Total number of PDs per category (DVCAT) at site',
				font: {
					size: 16
				}
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Total number of PDs per category',
					font: {
						size: 13
					}
				},
			},
			y: {
				title: {
					display: true,
					text: 'Category for Protocol Deviation',
					font: {
						size: 13
					}
				},
				beginAtZero: true,
			},
		},
	};


	constructor(
		private categoryBarGraphService: CategoryBarGraphService,
		private shareSiteDataService: ShareSiteDataService
	) { }
	
	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.setWidthAndHeightToParent();
			this.selectedSiteId = siteId;
			this.loadEntryCountPerCategory();
			this.error = false;
		});
	}


	loadEntryCountPerCategory() {
		this.categoryBarGraphService.getEntryCountPerCategory(this.selectedSiteId).subscribe(
			data => {
				this.data = {
					labels: data.map((entry) => entry.dvcat),
					datasets: [{
						data: data.map((entry) => entry.entryCount),
						label: 'DVCAT'
					}]
				};
				this.error = false;
			},
			error => {
				error = true;
				console.error('Error loading data for bar graph: ', error);
			});
	}
	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.width = 0;
		this.height = 0;
		this.setWidthAndHeightToParent();
	}

	setWidthAndHeightToParent(parent: any = d3.select('div.bar')) {
		let dim = DimensionService.getHTMLDimensions(parent);
		this.width = dim.width;
		this.height = dim.height;
	}
}
