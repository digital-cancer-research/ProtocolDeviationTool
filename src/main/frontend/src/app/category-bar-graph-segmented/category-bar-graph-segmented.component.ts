import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CategoryBarGraphSegmentedService } from './category-bar-graph-segmented.service';
import { EntryCountPerCategoryPerStudyDTO } from './category-bar-graph-segmented.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import { DimensionService } from '../services/dimension-service.service';

@Component({
  selector: 'app-category-bar-graph-segmented',
  templateUrl: './category-bar-graph-segmented.component.html',
  styleUrls: ['./category-bar-graph-segmented.component.css']
})

export class CategoryBarGraphSegmentedComponent implements OnInit {
	entryCountPerCategoryPerStudy: EntryCountPerCategoryPerStudyDTO[] = [];
	selectedSiteId?: string;

	constructor(private elementRef: ElementRef,
	    private categoryBarGraphSegmentedService: CategoryBarGraphSegmentedService,
	    private shareSiteDataService: ShareSiteDataService) { }

	ngOnInit() {
	    this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.selectedSiteId = siteId;
			this.loadEntryCountPerCategoryPerStudy();
	    });
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.createD3BarGraph();
	}

	loadEntryCountPerCategoryPerStudy() {
		this.categoryBarGraphSegmentedService
		.getEntryCountPerCategoryPerStudy(this.selectedSiteId).subscribe(
	    	data => {
	        	this.entryCountPerCategoryPerStudy = data;
				this.createD3BarGraph();
	      	},
	    	error => {
	        	console.error('Error loading data: ', error);
	      	}
	    );
	  }

	createD3BarGraph() {
		const nativeElement = this.elementRef.nativeElement;
		const div = d3.select('div.histogramContent');
		div.selectChild('svg').remove();
		DimensionService.getHTMLDimensions(div);
		const divDimensions = DimensionService.getHTMLDimensions(div);
		const width = 0.6*divDimensions.width;
		const height = 0.75*divDimensions.height;
		const margin = { top: 0.05*height, 
					   right: 0.1*width,
					  bottom: 0.3*height,
					    left: 0.3*width};

		const svg = div
		.append('svg')
		.attr('width', width + margin.left - margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', `translate(${(margin.left - margin.right)/1.5},0)`);
					
		if (width < 684) {
			div.
			select('svg')
			.attr('viewBox', `-20 0 ${width + margin.left} ${height + margin.top + margin.bottom}`)
		}

		// Calculate the total entry count for each study
		const totalEntryCounts = this.entryCountPerCategoryPerStudy.map(entry => ({
		    studyId: entry.studyId,
		    totalEntryCount: d3.sum(this.entryCountPerCategoryPerStudy
				.filter(d => d.studyId === entry.studyId), d => d.entryCount)!
		}));

		// Define scales
		const xScale = d3.scaleLinear()
			.domain([0, d3.max(totalEntryCounts, d => d.totalEntryCount)!])
			.range([0, width]);

		const yScale = d3.scaleBand()
			.domain(this.entryCountPerCategoryPerStudy.map(d => d.studyId))
			.range([0, height])
			.padding(0.1);

		// Define color scale
		const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

		// Create stacked bars
		svg.selectAll('.bar')
			.data(this.entryCountPerCategoryPerStudy)
			.enter().append('rect')
			.attr('class', 'bar')
			.attr('x', d => {

				let sum = 0;
				// Calculate the cumulative entry count up to the current category
				for (const entry of this.entryCountPerCategoryPerStudy
					.filter(e => e.studyId === d.studyId)) {
					if (entry.dvcat === d.dvcat) break;
					sum += entry.entryCount;
				}
				return xScale(sum);
				})
			.attr('y', d => yScale(d.studyId)!)
			.attr('width', d => xScale(d.entryCount)!)
			.attr('height', yScale.bandwidth())
			.style('fill', d => colorScale(d.dvcat))
			.on('mouseover', function (event, d) {
				const xPos = event.pageX;
				const yPos = event.pageY;
		        tooltip
				.style('opacity', 1)
				.style('left', (xPos + 20) + 'px')
				.style('top', (yPos - 20) + 'px')
				.html(`<strong>${d.dvcat}</strong><br>Count: ${d.entryCount}`)
		    })
		    .on('mousemove', function (event, d) {
				const xPos = event.pageX;
				const yPos = event.pageY;
				tooltip
				.style('left', (xPos + 20) + 'px')
				.style('top', (yPos - 20) + 'px');
			})
			.on('mouseout', function (d) {
				tooltip
				.style('opacity', 0);
			});

		// Add y-axis

		const y = d3
		.scaleBand()
		.range([0, height])
		.domain(this.entryCountPerCategoryPerStudy.map((d) => d.studyId || ''))
		.padding(0.1);

		svg.append('g')
		.call(d3.axisLeft(y))
		.selectAll('text')
		.style('font-size', '0.75vw');

		// Add x-axis
		const x = d3
		.scaleLinear()
		.domain([0, d3.max(totalEntryCounts, d => d.totalEntryCount)!])
		.range([0, width]);
		svg.append('g')
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

		// Define tooltip
		const tooltip = d3.select(this.elementRef.nativeElement).append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0)
			.style('position', 'absolute')
			.style('background-color', 'white')
			.style('border', 'solid')
			.style('border-width', '1px')
			.style('border-radius', '5px')
			.style('padding', '10px');
	}
}