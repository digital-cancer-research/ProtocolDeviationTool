import { Component, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { VisualisationService } from './visualisation.service';
import { ShareSiteDataService } from '../site-select/share-site-data.service';
import { DimensionService } from '../services/dimension-service.service';
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

   getHTMLDimensions(selection: any) {
	var dimensions = null;
	var node = selection.node();
	dimensions = node.getBoundingClientRect();
	return dimensions;
  }

  createD3Chart() {
	const div = d3.select("div.count");
	div.selectChild('svg').remove();
	DimensionService.getHTMLDimensions(div);
	const divDimensions = DimensionService.getHTMLDimensions(div);
	const divWidth = divDimensions.width;
	const divHeight = divDimensions.height;

	const svgWidth = divWidth;
	const svgHeight = divHeight/3;
	const svg = div
		.append('svg')
		.attr('width', '50%')
		.attr('height', '40%');
	
	// Calculate the center position for the rectangle and text
	const viewportHeight = window.innerHeight;
	const fontSizeVh = 5;
	const fontSizePx = (viewportHeight * fontSizeVh) / 100;
	const halfFontSizePx = fontSizePx / 2;
  
	// Add a rectangle to represent the data
	svg.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', '100%')
		.attr('height', '100%')
		.attr('fill', 'steelblue');
  
	// Add the count
	svg.append('text')
		.attr('x', '50%')
		.attr('y', `calc(60% + ${halfFontSizePx})` )
		.attr('text-anchor', 'middle')
		.text(`${this.totalRows}`)
		.attr('font-size', `${fontSizeVh}vh`)
		.attr('fill', 'white');
	}	
}