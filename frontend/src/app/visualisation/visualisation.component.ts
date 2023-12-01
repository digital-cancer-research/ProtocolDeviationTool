import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { VisualisationService } from './visualisation.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.sass']
})
export class VisualisationComponent implements OnInit {
  totalRows!: number;
  selectedSiteId?: string;

  constructor(
		    private elementRef: ElementRef,
		    private visualisationService: VisualisationService,
		    private shareSiteDataService: ShareSiteDataService
		  ) {}

  ngOnInit() {
	  this.shareSiteDataService.selectedSiteId$.subscribe((siteId: string | undefined) => {
		  this.selectedSiteId = siteId;
		  this.fetchTotalRows();
		});

  }

  fetchTotalRows() {
    // Fetch total rows based on the selected siteId
    this.visualisationService.getTotalRows(this.selectedSiteId).subscribe(
      (data) => {
        this.totalRows = data;
        this.createD3Chart();
      },
      (error) => {
        console.error('Error fetching total rows: ', error);
      }
    );
  }

  createD3Chart() {
	  d3.select(this.elementRef.nativeElement).selectAll('*').remove();
	  const nativeElement = this.elementRef.nativeElement;
	  const svgWidth = window.innerWidth / 4;
	  const svgHeight = 200;
	  const padding = { top: 50, left: 50 };

	  const svg = d3.select(nativeElement).append('svg')
	    .attr('width', svgWidth)
	    .attr('height', svgHeight);

	  // Calculate the center position for the rectangle and text
	  const centerX = (svgWidth + 50) / 2;
	  const centerY = (svgHeight + 50) / 2;

	  // Add a rectangle to represent the data
	  svg.append('rect')
	    .attr('x', padding.left)
	    .attr('y', padding.top)
	    .attr('width', svgWidth - padding.left)
	    .attr('height', svgHeight - padding.top)
	    .attr('fill', 'steelblue');

	  // Add the count
	  svg.append('text')
	    .attr('x', centerX)
	    .attr('y', centerY)
	    .attr('text-anchor', 'middle')
	    .text(`${this.totalRows}`)
	    .attr('font-size', '48px')
	    .attr('fill', 'white');

	  // Add a title
	  svg.append('text')
	    .attr('x', centerX)
	    .attr('y', padding.top - 10)
	    .attr('text-anchor', 'middle')
	    .text('Total number of PDs at site')
	    .style('font-size', '20px');
	}


}