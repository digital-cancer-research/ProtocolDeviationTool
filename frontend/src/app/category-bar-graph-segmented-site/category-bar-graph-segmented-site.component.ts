import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoryBarGraphSegmentedSiteService } from './category-bar-graph-segmented-site.service';
import { EntryCountPerSubcategoryPerCategoryDTO } from './category-bar-graph-segmented-site.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';
import { ShareSiteDataService } from '../site-select/share-site-data.service';

@Component({
  selector: 'app-category-bar-graph-segmented-site',
  templateUrl: './category-bar-graph-segmented-site.component.html',
  styleUrls: ['./category-bar-graph-segmented-site.component.css']
})

export class CategoryBarGraphSegmentedSiteComponent implements OnInit {
	entryCountPerSubcategoryPerCategory: EntryCountPerSubcategoryPerCategoryDTO[] = [];
	  selectedSiteId?: string;

	  constructor(private elementRef: ElementRef,
	    private categoryBarGraphSegmentedSiteService: CategoryBarGraphSegmentedSiteService,
	    private shareSiteDataService: ShareSiteDataService) { }

	  ngOnInit() {
	    this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
	      this.selectedSiteId = siteId;
	      this.loadEntryCountPerSubcategoryPerCategory();
	    });
	  }

	  loadEntryCountPerSubcategoryPerCategory() {
	    this.categoryBarGraphSegmentedSiteService.getEntryCountPerSubcategoryPerCategory(this.selectedSiteId).subscribe(
	      data => {
	        this.entryCountPerSubcategoryPerCategory = data;
	        console.log('entryCountPerSubcategoryPerCategory:',this.entryCountPerSubcategoryPerCategory);
	        this.createD3BarGraph();

	      },
	      error => {
	        console.error('Error loading data: ', error);
	      }
	    );
	  }

	  createD3BarGraph() {
		  d3.select(this.elementRef.nativeElement).selectAll('*').remove();
		  const margin = { top: 50, right: 30, bottom: 30, left: 500 };
		  const width = 1600 - margin.left - margin.right;
		  const height = 380 - margin.top - margin.bottom;

		  // Append SVG to the component's element
		  const svg = d3.select(this.elementRef.nativeElement).append('svg')
		    .attr('width', width + margin.left + margin.right)
		    .attr('height', height + margin.top + margin.bottom)
		    .append('g')
		    .attr('transform', `translate(${margin.left},${margin.top})`);

		  // Group data by dvcat and calculate total entry count for each dvcat
		  const groupedData = d3.group(this.entryCountPerSubcategoryPerCategory, d => d.dvcat);
		  const dvcatTotals = Array.from(groupedData, ([dvcat, values]) => ({
		    dvcat,
		    total: d3.sum(values, d => d.entryCount),
		    values: values.sort((a, b) => d3.descending(a.entryCount, b.entryCount))
		  }));

		  // Sort dvcat categories by total entry count in descending order
		  dvcatTotals.sort((a, b) => d3.ascending(a.total, b.total));

		  // Flatten the sorted data for cumulative calculations
		  let cumulativeCounts: any[] = [];
		  dvcatTotals.forEach(group => {
		    let cumulativeCount = 0;
		    group.values.forEach(entry => {
		      cumulativeCount += entry.entryCount;
		      cumulativeCounts.push({ ...entry, cumulativeCount });
		    });
		  });

		  // Define scales
		  const xScale = d3.scaleLinear()
		    .domain([0, d3.max(cumulativeCounts, d => d.cumulativeCount)!])
		    .range([0, width]);

		  const yScale = d3.scaleBand()
		    .domain(dvcatTotals.map(d => d.dvcat))
		    .range([height, 0])
		    .padding(0.1);

		  // Define color scale
		  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

		  // Create stacked bars
		  svg.selectAll('.bar')
		    .data(cumulativeCounts)
		    .enter().append('rect')
		    .attr('class', 'bar')
		    .attr('x', d => xScale(d.cumulativeCount - d.entryCount))
		    .attr('y', d => yScale(d.dvcat)!)
		    .attr('width', d => xScale(d.entryCount)!)
		    .attr('height', yScale.bandwidth())
		    .style('fill', d => colorScale(d.dvdecod))
		    .on('mouseover', function (event, d) {
		        const xPos = event.pageX;
		        const yPos = event.pageY;

		        tooltip
		          .style('opacity', 1)
		          .style('left', (xPos + 20) + 'px')
		          .style('top', (yPos - 20) + 'px')
		          .html(`<strong>${d.dvdecod}</strong><br>Count: ${d.entryCount}`)
		      })
		      .on('mousemove', function (event, d) {
		        const xPos = event.pageX;
		        const yPos = event.pageY;

		        tooltip
		          .style('left', (xPos + 30) + 'px')
		          .style('top', (yPos + 20) + 'px');
		      })
		      .on('mouseout', function (event: MouseEvent) {
		        const relatedTarget = event.relatedTarget as Element | null;
		        if (relatedTarget && relatedTarget.classList.contains('tooltip')) {
		          return;
		        }
		        tooltip.style('opacity', 0);
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
		      .text('Total number of protocol deviation coded term (DVDECOD) within each category for protocol deviation (DVCAT) at site');

		    // Add Y axis label
		    svg.append('text')
		      .attr('transform', 'rotate(-90)')
		      .attr('x', -height / 2)
		      .attr('y', -margin.left / 1.2)
		      .attr('text-anchor', 'middle')
		      .text('DVCAT')
		      .on('mouseover', function (event, d) {
			        const xPos = event.pageX;
			        const yPos = event.pageY;

			        tooltip
			          .style('opacity', 1)
			          .style('left', (xPos + 20) + 'px')
			          .style('top', (yPos - 20) + 'px')
			          .html(`Category for Protocol Deviation`)
			      })
			      .on('mousemove', function (event, d) {
			        const xPos = event.pageX;
			        const yPos = event.pageY;

			        tooltip
			          .style('left', (xPos + 30) + 'px')
			          .style('top', (yPos + 20) + 'px');
			      })
			      .on('mouseout', function (event: MouseEvent) {
			        const relatedTarget = event.relatedTarget as Element | null;
			        if (relatedTarget && relatedTarget.classList.contains('tooltip')) {
			          return;
			        }
			        tooltip.style('opacity', 0);
			      });

		    // Add X axis label
		    svg.append('text')
		      .attr('x', width / 2)
		      .attr('y', height + margin.bottom)
		      .attr('text-anchor', 'middle')
		      .style('font-size', '14px')
		      .text('Total number of PDs per DVDECOD')
		      .on('mouseover', function (event, d) {
			        const xPos = event.pageX;
			        const yPos = event.pageY;

			        tooltip
			          .style('opacity', 1)
			          .style('left', (xPos + 20) + 'px')
			          .style('top', (yPos - 20) + 'px')
			          .html(`Protocol Deviation Coded Term`)
			      })
			      .on('mousemove', function (event, d) {
			        const xPos = event.pageX;
			        const yPos = event.pageY;

			        tooltip
			          .style('left', (xPos + 30) + 'px')
			          .style('top', (yPos + 20) + 'px');
			      })
			      .on('mouseout', function (event: MouseEvent) {
			        const relatedTarget = event.relatedTarget as Element | null;
			        if (relatedTarget && relatedTarget.classList.contains('tooltip')) {
			          return;
			        }
			        tooltip.style('opacity', 0);
			      });

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