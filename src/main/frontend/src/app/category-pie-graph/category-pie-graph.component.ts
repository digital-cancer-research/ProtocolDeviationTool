import { Component, HostListener, OnInit } from '@angular/core';
import { CategoryPieGraphService } from './category-pie-graph.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import * as d3 from 'd3';
import { DimensionService } from '../services/dimension-service.service';

@Component({
	selector: 'app-category-pie-graph',
	templateUrl: './category-pie-graph.component.html',
	styleUrls: ['./category-pie-graph.component.css']
})
export class CategoryPieGraphComponent implements OnInit {
	width: number = 0;
	height: number = 0;
	selectedSiteId?: string;
	data: any;
	error: boolean = false;
	options = {
		plugins: {
			title: {
				display: true,
				text: 'Total number of PDs per study',
				font: {
					size: 16
				}
			}
		}
	}
	constructor(
		private categoryPieGraphService: CategoryPieGraphService,
		private shareSiteDataService: ShareSiteDataService,
	) { }

	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.setWidthAndHeightToParent();
			this.selectedSiteId = siteId;
			this.loadEntryCountPerStudy();
			this.error = false;
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

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.width = 0;
		this.height = 0;
		this.setWidthAndHeightToParent();
	}

	setWidthAndHeightToParent(parent: any = d3.select('div.pie')) {
		let dim = DimensionService.getHTMLDimensions(parent);
		this.width = dim.width;
		this.height = dim.height;
	}

}
