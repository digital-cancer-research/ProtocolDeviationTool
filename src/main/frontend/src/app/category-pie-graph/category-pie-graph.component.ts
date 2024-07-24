import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CategoryPieGraphService } from './category-pie-graph.service';
import { EntryCountPerStudyDTO } from './category-pie-graph.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import { DimensionService } from '../services/dimension-service.service';

@Component({
  selector: 'app-category-pie-graph',
  templateUrl: './category-pie-graph.component.html',
  styleUrls: ['./category-pie-graph.component.css']
})
export class CategoryPieGraphComponent implements OnInit {
	entryCountPerStudy: EntryCountPerStudyDTO[] = [];
	selectedSiteId?: string;
	constructor(private elementRef: ElementRef,
		private categoryPieGraphService: CategoryPieGraphService, 
		private shareSiteDataService: ShareSiteDataService) {}

	ngOnInit() {
		this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
			this.selectedSiteId = siteId;
			this.loadEntryCountPerStudy();
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.createD3PieGraph();
	}

	loadEntryCountPerStudy() {
		this.categoryPieGraphService.getEntryCountPerStudy(this.selectedSiteId).subscribe(
		data => {
			this.entryCountPerStudy = data;
			this.createD3PieGraph();
		},
		error => {
			console.error('Error loading data: ', error);
		});
		
	}

  createD3PieGraph() {
	  const nativeElement = this.elementRef.nativeElement;
	  const div = d3.select('div.donutContent');
	  div.selectChild('svg').remove();
	  DimensionService.getHTMLDimensions(div);
	  const divDimensions = DimensionService.getHTMLDimensions(div);
	  const margin = { top: 0.05*divDimensions.height,
		 			   right: 0.25*divDimensions.width,
					   bottom: 0.35*divDimensions.height,
					   left: 0.35*divDimensions.width
					};
	  const width = divDimensions.width - margin.left - margin.right;
	  const height = 0.7*divDimensions.height - margin.bottom;

	  const svg = div
	    .append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${width/2.5},${height/1.3})`);

	if (width < 684) {
		div.
		select('svg')
		.attr('viewBox', `-20 0 ${width + margin.left} ${height + margin.top + margin.bottom}`)
	}


	  const pie = d3.pie<EntryCountPerStudyDTO>()
	    .value((d) => d.entryCount || 0)
	    .sort(null);

	  const arcs = pie(this.entryCountPerStudy);

	  const outerRadius = Math.min(width, height) / 1.5;
	  const innerRadius = Math.min(width, height) / 10;

	  const arc = d3.arc<d3.PieArcDatum<EntryCountPerStudyDTO>>()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);

	  const color = d3.scaleOrdinal(d3.schemeCategory10);

	  const tooltip = d3.select(nativeElement).append('div')
			    .attr('class', 'tooltip')
			    .style('opacity', 0)
			    .style("position", "absolute")
			    .style("background-color", "white")
			    .style("border", "solid")
			    .style("border-width", "1px")
			    .style("border-radius", "5px")
			    .style("padding", "10px")
	  
	  // Add slices
	  svg.selectAll('slice')
	    .data(arcs)
	    .enter()
	    .append('path')
	    .attr('d', arc)
	    .attr('fill', (d, i) => color(String(i)))
	    .on('mouseover', function (event, d) {
	        const entryCount = d.data.entryCount || 0;
	        const studyId = d.data.studyId || 0;
	        const xPos = event.pageX;
	        const yPos = event.pageY;

	        tooltip
	          .style('opacity', 1)
	          .style('left', (xPos + 20) + 'px')
	          .style('top', (yPos - 20) + 'px');
	        tooltip.html(`<strong>Study ID:</strong> ${studyId}<br/><strong>Entry Count:</strong> ${entryCount}`);
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
	
	// Add legend
	
	  const legend = svg.selectAll('.legend')
	    .data(this.entryCountPerStudy)
	    .enter().append('g')
	    .attr('class', 'legend')
	    .attr('transform', (d, i) => `translate(0, ${i * 0.18*height})`);

	  legend.append('rect')
	    .attr('x', width / 2 + 10)
	    .attr('y', -height / 1.5 + margin.top)
	    .attr('width', 0.1*height)
	    .attr('height', 0.1*height)
	    .style('fill', (d, i) => color(String(i)));

	  legend.append('text')
	    .attr('x', width / 2 + 40)
	    .attr('y', -height / 1.6 + margin.top)
	    .attr('dy', '.35em')
	    .style('text-anchor', 'start')
		.style('font-size', '2vh')
	    .text((d) => d.studyId);

	}
}
