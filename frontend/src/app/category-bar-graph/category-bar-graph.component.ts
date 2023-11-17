import { Component, OnInit } from '@angular/core';
import { CategoryBarGraphService } from './category-bar-graph.service';
import { EntryCountPerCategoryDTO } from './category-bar-graph.model';
import * as d3 from 'd3';
import { scaleLinear, scaleBand, max, ValueFn } from 'd3';

@Component({
  selector: 'app-category-bar-graph',
  templateUrl: './category-bar-graph.component.html',
  styleUrls: ['./category-bar-graph.component.sass']
})
export class CategoryBarGraphComponent implements OnInit {
  entryCountPerCategory: EntryCountPerCategoryDTO[] = [];

  constructor(private categoryBarGraphService: CategoryBarGraphService) {}

  ngOnInit() {
    this.loadEntryCountPerCategory();
  }

  loadEntryCountPerCategory() {
    this.categoryBarGraphService.getEntryCountPerCategory().subscribe(
      data => {
        this.entryCountPerCategory = data;
        console.log(this.entryCountPerCategory);
        this.createD3BarGraph();
        
      },
      error => {
        console.error('Error loading data: ', error);
      }
    );
  }

  createD3BarGraph() {
	  const margin = { top: 20, right: 20, bottom: 60, left: 60 };
	  const width = 600 - margin.left - margin.right;
	  const height = 400 - margin.top - margin.bottom;

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
	    .style('font-size', '16px')
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
	    .attr('y', -margin.left / 1.5)
	    .attr('text-anchor', 'middle')
	    .style('font-size', '14px')
	    .text('Category for Protocol Deviation');

	  // Add X axis
	  svg.append('g')
	    .attr('transform', `translate(0, ${height})`)
	    .call(d3.axisBottom(x));

	  // Add bars
	  svg
	    .selectAll('.bar')
	    .data(this.entryCountPerCategory)
	    .enter()
	    .append('rect')
	    .attr('class', 'bar')
	    .attr('width', (d) => x(d.entryCount || 0))
	    .attr('height', y.bandwidth())
	    .attr('y', yAttr)
	    .attr('fill', 'steelblue');
	}


}
