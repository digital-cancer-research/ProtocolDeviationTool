import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoryBarGraphSegmentedService } from './category-bar-graph-segmented.service';
import { EntryCountPerCategoryPerStudyDTO } from './category-bar-graph-segmented.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';

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

	  loadEntryCountPerCategoryPerStudy() {
	    this.categoryBarGraphSegmentedService.getEntryCountPerCategoryPerStudy(this.selectedSiteId).subscribe(
	      data => {
	        this.entryCountPerCategoryPerStudy = data;
	        console.log(this.entryCountPerCategoryPerStudy);

	        this.createD3BarGraph();

	      },
	      error => {
	        console.error('Error loading data: ', error);
	      }
	    );
	  }

	  createD3BarGraph() {
		  d3.select(this.elementRef.nativeElement).selectAll('*').remove();
		    const margin = { top: 50, right: 30, bottom: 30, left: 100 };
		    const width = 800 - margin.left - margin.right;
		    const height = 380 - margin.top - margin.bottom;

		    // Append SVG to the component's element
		    const svg = d3.select(this.elementRef.nativeElement).append('svg')
		      .attr('width', width + margin.left + margin.right)
		      .attr('height', height + margin.top + margin.bottom)
		      .append('g')
		      .attr('transform', `translate(${margin.left},${margin.top})`);
		    
			 // Calculate the total entry count for each study
		    const totalEntryCounts = this.entryCountPerCategoryPerStudy.map(entry => ({
		      studyId: entry.studyId,
		      totalEntryCount: d3.sum(this.entryCountPerCategoryPerStudy.filter(d => d.studyId === entry.studyId), d => d.entryCount)!
		    }));

		    // Define scales
		    const xScale = d3.scaleLinear()
		      .domain([0, d3.max(totalEntryCounts, d => d.totalEntryCount)!])
		      .range([0, width]);

		    const yScale = d3.scaleBand()
		      .domain(this.entryCountPerCategoryPerStudy.map(d => d.studyId))
		      .range([height, 0])
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
		    	    for (const entry of this.entryCountPerCategoryPerStudy.filter(e => e.studyId === d.studyId)) {
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
		    svg.append('g')
		      .attr('class', 'axis')
		      .call(d3.axisLeft(yScale));

		    // Add x-axis
		    svg.append('g')
		      .attr('class', 'axis')
		      .attr('transform', `translate(0,${height})`)
		      .call(d3.axisBottom(xScale).ticks(5));

		    // Add chart title
		    svg.append('text')
		      .attr('x', width / 2)
		      .attr('y', -margin.top / 2)
		      .attr('text-anchor', 'middle')
		      .text('Total number of PDs per category (DVCAT) per study at site');

		    // Add Y axis label
		    svg.append('text')
		      .attr('transform', 'rotate(-90)')
		      .attr('x', -height / 2)
		      .attr('y', -margin.left / 1.2)
		      .attr('text-anchor', 'middle')
		      .text('Study ID');
		    
			 // Add X axis label
		    svg.append('text')
		        .attr('x', width / 2)
		        .attr('y', height + margin.bottom)
		        .attr('text-anchor', 'middle')
		        .style('font-size', '14px')
		        .text('Entry Count');


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