import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { VisualisationService } from './visualisation.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.sass']
})
export class VisualisationComponent implements OnInit {
  totalRows!: number;

  constructor(private elementRef: ElementRef, private visualisationService: VisualisationService) {}

  ngOnInit() {
    // Fetch total rows
    this.visualisationService.getTotalRows().subscribe(
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
	  const nativeElement = this.elementRef.nativeElement;
	  const svgWidth = window.innerWidth / 4;
	  const svgHeight = 200;
	  const svg = d3.select(nativeElement).append('svg')
	    .attr('width', svgWidth)
	    .attr('height', svgHeight);

	  // Calculate the center position for the rectangle and text
	  const centerX = svgWidth / 2;
	  const centerY = svgHeight / 2;

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
	    .attr('y', centerY)
	    .attr('text-anchor', 'middle')
	    .text(`${this.totalRows}`)
	    .attr('font-size', '48px')
	    .attr('fill', 'white');
	}

}