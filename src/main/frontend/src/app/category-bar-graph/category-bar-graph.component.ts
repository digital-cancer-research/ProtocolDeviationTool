import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CategoryBarGraphService } from './category-bar-graph.service';
import { EntryCountPerCategoryDTO } from './category-bar-graph.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import { DimensionService } from '../services/dimension-service.service';

@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrls: ['./category-bar-graph.component.css']
})
export class CategoryBarGraphComponent implements OnInit {
	entryCountPerCategory: EntryCountPerCategoryDTO[] = [];
	selectedSiteId?: string;

	constructor(private elementRef: ElementRef,
		private categoryBarGraphService: CategoryBarGraphService, 
		private shareSiteDataService: ShareSiteDataService) {}

	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
	  	this.selectedSiteId = siteId;
	  	this.loadEntryCountPerCategory();
	});
  }

  	@HostListener('window:resize', ['$event'])
  	onResize(event: Event) {
		  this.createD3BarGraph();
	}
	
	loadEntryCountPerCategory() {
		this.categoryBarGraphService.getEntryCountPerCategory(this.selectedSiteId).subscribe(
      	data => {
        	this.entryCountPerCategory = data;
			this.createD3BarGraph();
		},
		error => {
			console.error('Error loading data: ', error);
		}
    );
  }

  createD3BarGraph() {
	const nativeElement = this.elementRef.nativeElement;
	const div = d3.select("div.barContent");
	div.selectChild('svg').remove();
	DimensionService.getHTMLDimensions(div);
	const divDimensions = DimensionService.getHTMLDimensions(div);
	const width = 0.8*divDimensions.width;
	const height = 0.75*divDimensions.height;
	const margin = { top: 0.05*height, 
				   right: -0.35*width,
			 	  bottom: 0.2*height, 
				    left: 0.4*width
				};

	const svg = div
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', `translate(${(margin.left - margin.right)/1.5},${margin.top})`);
	
	if (width < 684) {
		div.
		select('svg')
		.attr('viewBox', `-20 0 ${width + margin.left + margin.right} ${height*1.1 + margin.top + margin.bottom}`)
	}

	const maxEntry = d3.max(this.entryCountPerCategory, (d) => d.entryCount) || 0;
  	const x = d3
	.scaleLinear()
	.domain([0, maxEntry])
	.range([0, width/1.5 - margin.left - margin.right/3]);
	svg.append('g')
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));
	
	if (height > 148) {
		svg.append('text')
			.attr('x', (width  - margin.left)/3)
			.attr('y', height + margin.bottom - 5)
			.attr('text-anchor', 'middle')
			.style('font-size', '2vh')
			.text('Total number of PDs per category');
	}
	else {
		svg.append('text')
			.attr('x', (width  - margin.left)/3)
			.attr('y', height + margin.bottom + 2.5)
			.attr('text-anchor', 'middle')
			.style('font-size', '2vh')
			.text('Total number of PDs per category');
		
	}

  const y = d3
	.scaleBand()
	.range([0, height])
	.domain(this.entryCountPerCategory.map((d) => d.dvcat || ''))
	.padding(0.1);

	svg.append('g')
		.call(d3.axisLeft(y))
		.selectAll('text')
		.style('font-size', '0.75vw');

	const yAttr: ValueFn<SVGRectElement, EntryCountPerCategoryDTO, string | number | boolean | null> =
	(d) => (d.dvcat ? y(d.dvcat) || 0 : 0);

	const tooltip = d3.select(nativeElement).append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0)
			.style("position", "absolute")
			.style("background-color", "white")
			.style("border", "solid")
			.style("border-width", "1px")
			.style("border-radius", "5px")
			.style("padding", "10px")
		
	const color = d3.scaleOrdinal(d3.schemeCategory10);
			    
	 // Add bars
	  svg.selectAll('.bar')
	    .data(this.entryCountPerCategory)
	    .enter()
	    .append('rect')
	    .attr('class', 'bar')
	    .attr('width', (d) => x(d.entryCount || 0))
	    .attr('height', y.bandwidth())
	    .attr('y', yAttr)
	    .attr('fill', (d, i) => color(String(i)))
	    .on('mouseover', function (event, d) {
	        const entryCount = d.entryCount || 0;
	        const xPos = event.pageX;
	        const yPos = event.pageY;

	        tooltip
	          .style('opacity', 1)
	          .style('left', (xPos + 20) + 'px')
	          .style('top', (yPos - 20) + 'px');
	        tooltip.html(`<strong>${entryCount}</strong>`)
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
	}


}
