import { Component, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { VisualisationService } from './visualisation.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.createD3Chart();
  }

  fetchTotalRows() {

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
	  const svgWidth = (window.innerWidth)/6;
	  const svgHeight = (window.innerHeight)/6;

	  const svg = d3.select(nativeElement).append('svg')
	    .attr('width', svgWidth)
	    .attr('height', svgHeight);

	  // Calculate the center position for the rectangle and text
	  const centerX = (svgWidth) / 2;
	  const centerY = (svgHeight) / 2;

	  // Add a rectangle to represent the data
	  svg.append('rect')
	    .attr('x', 0)
	    .attr('y', 0)
	    .attr('width', svgWidth)
	    .attr('height', svgHeight)
	    .attr('fill', 'steelblue');

	  // Add the count
	  svg.append('text')
	    .attr('x', centerX)
	    .attr('y', centerY + 15)
	    .attr('text-anchor', 'middle')
	    .text(`${this.totalRows}`)
	    .attr('font-size', '5vh')
	    .attr('fill', 'white');
	}


}