import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoryBarGraphService } from './category-bar-graph.service';
import { EntryCountPerCategoryDTO } from './category-bar-graph.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';

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
	  d3.select('#categoryBarGraph').selectAll('*').remove();
	  const nativeElement = this.elementRef.nativeElement;
	  const margin = { top: 50, right: 20, bottom: 60, left: 400 };
	  const width = 1000 - margin.left - margin.right;
	  const height = 350 - margin.top - margin.bottom;

	  const svg = d3
	    .select('#categoryBarGraph')
	    .append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${margin.left},${margin.top})`);

	  const x = d3
	    .scaleLinear()
	    .domain([0, d3.max(this.entryCountPerCategory, (d) => d.entryCount) || 0])
	    .range([0, width]);

	  const y = d3
	    .scaleBand<string>()
	    .range([height, 0])
	    .domain(this.entryCountPerCategory.map((d) => d.dvcat || ''))
	    .padding(0.1);

	  const yAttr: ValueFn<SVGRectElement, EntryCountPerCategoryDTO, string | number | boolean | null> =
	    (d) => (d.dvcat ? y(d.dvcat) || 0 : 0);

	  // Add title
	  svg.append('text')
	    .attr('x', width / 2)
	    .attr('y', -margin.top / 2)
	    .attr('text-anchor', 'middle')
	    .style('font-size', '20px')
	    .text('Total number of PDs per category (DVCAT) at site');

	  // Add X axis label
	  svg.append('text')
	    .attr('x', width / 2)
	    .attr('y', height + margin.bottom / 1.5)
	    .attr('text-anchor', 'middle')
	    .style('font-size', '14px')
	    .text('Total number of PDs per category');

	  // Add Y axis label
	  svg.append('text')
	    .attr('transform', 'rotate(-90)')
	    .attr('x', -height / 2)
	    .attr('y', -margin.left / 1.1)
	    .attr('text-anchor', 'middle')
	    .style('font-size', '14px')
	    .text('Category for Protocol Deviation');

	 // Calculate the number of ticks for the x-axis
	    const maxTicks = Math.min(10, this.entryCountPerCategory.length);

	    // Add X axis
	    svg.append('g')
	       .attr('transform', `translate(0, ${height})`)
	       .call(d3.axisBottom(x)
	       .ticks(maxTicks)
	       .tickFormat(d3.format('d')));
	  
	  // Add Y axis
	  svg.append('g')
	    .call(d3.axisLeft(y));

	  
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
