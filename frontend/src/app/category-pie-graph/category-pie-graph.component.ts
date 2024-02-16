import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoryPieGraphService } from './category-pie-graph.service';
import { EntryCountPerStudyDTO } from './category-pie-graph.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';

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

  loadEntryCountPerStudy() {
    this.categoryPieGraphService.getEntryCountPerStudy(this.selectedSiteId).subscribe(
      data => {
        this.entryCountPerStudy = data;
        this.createD3PieGraph();
        
      },
      error => {
        console.error('Error loading data: ', error);
      }
    );
  }

  createD3PieGraph() {
	  d3.select('#categoryPieGraph').selectAll('*').remove();
	  const nativeElement = this.elementRef.nativeElement;
	  const margin = { top: 20, right: 20, bottom: 60, left: 400 };
	  const width = 800 - margin.left - margin.right;
	  const height = 400 - margin.top - margin.bottom;

	  const svg = d3
	    .select('#categoryPieGraph')
	    .append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${width / 2},${height / 2})`);

	  const pie = d3.pie<EntryCountPerStudyDTO>()
	    .value((d) => d.entryCount || 0)
	    .sort(null);

	  const arcs = pie(this.entryCountPerStudy);

	  const outerRadius = Math.min(width, height) / 2.5;
	  const innerRadius = Math.min(width, height) / 7.5;

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

	  
	  // Add title above the pie chart
	  svg.append('text')
	    .attr('text-anchor', 'middle')
	    .style('font-size', '20px')
	    .attr('y', -height / 2 + margin.top)
	    .text('Total number of PDs per study');

	}


}
