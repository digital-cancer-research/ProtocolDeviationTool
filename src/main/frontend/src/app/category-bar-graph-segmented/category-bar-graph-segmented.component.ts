import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CategoryBarGraphSegmentedService } from './category-bar-graph-segmented.service';
import { EntryCountPerCategoryPerStudyDTO } from './category-bar-graph-segmented.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import { DimensionService } from '../services/dimension-service.service';
import * as _ from 'lodash';

@Component({
	selector: 'app-category-bar-graph-segmented',
	templateUrl: './category-bar-graph-segmented.component.html',
	styleUrls: ['./category-bar-graph-segmented.component.css']
})

export class CategoryBarGraphSegmentedComponent implements OnInit {
	width: number = 0;
	height: number = 0;
	data: any;
	error: boolean = false;
	entryCountPerCategoryPerStudy: EntryCountPerCategoryPerStudyDTO[] = [];
	selectedSiteId?: string;
	options = {
		indexAxis: 'y',
		plugins: {
			title: {
				display: true,
				text: 'Total number of PDs per category (DVCAT) per study at site',
				font: {
					size: 16
				}
			},
		},
		scales: {
			x: {
				stacked: true,
				title: {
					display: true,
					text: 'Total number of PDs per DVCAT',
					font: {
						size: 16
					}
				},
			},
			y: {
				stacked: true,
				title: {
					display: true,
					text: 'Study ID',
					font: {
						size: 16
					}
				},
				beginAtZero: true,
			},
		},
	};

	constructor(
		private categoryBarGraphSegmentedService: CategoryBarGraphSegmentedService,
		private shareSiteDataService: ShareSiteDataService
	) { }

	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.selectedSiteId = siteId;
			this.setWidthAndHeightToParent();
			this.loadEntryCountPerCategoryPerStudy();
		});
	}

	loadEntryCountPerCategoryPerStudy() {
		this.categoryBarGraphSegmentedService
			.getEntryCountPerCategoryPerStudy(this.selectedSiteId).subscribe(
				data => {
					this.data = this.formatData(data);
					this.error = false;
				},
				error => {
					console.error('Error loading data: ', error);
				}
			);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.width = 0;
		this.height = 0;
		this.setWidthAndHeightToParent();
	}

	setWidthAndHeightToParent(parent: any = d3.select('div.histogram')) {
		let dim = DimensionService.getHTMLDimensions(parent);
		this.width = dim.width;
		this.height = dim.height;
	}

	formatData(data: any) {
		const groupedData = _.groupBy(data, 'studyId');
		const categories = _.uniq(data.map((entry: { dvcat: any; }) => entry.dvcat));
		const datasets = categories.map(category => {
			return {
				label: category,
				data: Object.keys(groupedData).map(studyId => {
					const entry = groupedData[studyId].find(e => e.dvcat === category);
					return entry ? entry.entryCount : 0;
				})
			};
		});

		data = {
			labels: Object.keys(groupedData),
			datasets: datasets
		};
		return data;
	}

}