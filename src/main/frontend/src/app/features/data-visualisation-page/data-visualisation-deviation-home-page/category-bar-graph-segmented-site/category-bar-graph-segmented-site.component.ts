import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { CategoryBarGraphSegmentedSiteService } from './category-bar-graph-segmented-site.service';
import { EntryCountPerSubcategoryPerCategoryDTO } from './category-bar-graph-segmented-site.model';
import * as d3 from 'd3';
import { ShareSiteDataService } from 'src/app/site-select/share-site-data.service';

@Component({
  selector: 'app-category-bar-graph-segmented-site',
  templateUrl: './category-bar-graph-segmented-site.component.html',
  styleUrls: ['./category-bar-graph-segmented-site.component.css']
})
export class CategoryBarGraphSegmentedSiteComponent implements OnInit {
  entryCountPerSubcategoryPerCategory: EntryCountPerSubcategoryPerCategoryDTO[] = [];
  selectedSiteId?: string;
  dvcatTotals: { dvcat: string, total: number, values: EntryCountPerSubcategoryPerCategoryDTO[], isChecked: boolean }[] = [];
  toggleFilter!: (dvcat: string) => void;
  
  @Output() barClicked = new EventEmitter<string>();

  constructor(private elementRef: ElementRef,
    private categoryBarGraphSegmentedSiteService: CategoryBarGraphSegmentedSiteService,
    private shareSiteDataService: ShareSiteDataService) {
    
    this.toggleFilter = (dvcat: string) => {
      const total = this.dvcatTotals.find(t => t.dvcat === dvcat);
      if (total) {
        this.createD3BarGraph();
      }
    };
  }

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
        this.prepareData();
        this.createD3BarGraph();
      },
      error => {
        console.error('Error loading data: ', error);
      }
    );
  }

  prepareData() {
    // Group data by dvcat and calculate total entry count for each dvcat
    const groupedData = d3.group(this.entryCountPerSubcategoryPerCategory, d => d.dvcat);
    this.dvcatTotals = Array.from(groupedData, ([dvcat, values]) => ({
      dvcat,
      total: d3.sum(values, d => d.entryCount),
      values: values.sort((a, b) => d3.descending(a.entryCount, b.entryCount)),
      isChecked: true
    }));

    // Sort dvcat categories by total entry count in descending order
    this.dvcatTotals.sort((a, b) => d3.descending(a.total, b.total));
  }

  createD3BarGraph() {
    d3.select(this.elementRef.nativeElement).select('#chart').selectAll('*').remove();

    const margin = { top: 50, right: 30, bottom: 30, left: 500 };
    const width = 1500 - margin.left - margin.right;
    const height = 380 - margin.top - margin.bottom;

    // Append SVG to the component's element
    const svg = d3.select(this.elementRef.nativeElement).select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define custom colours
    const customColours = [
      "#FF0000", "#FF7F00", "#FFD400", "#FFFF00", "#BFFF00", "#6AFF00",
      "#00EAFF", "#0095FF", "#0040FF", "#AA00FF", "#FF00AA", "#EDB9B9",
      "#E7E9B9", "#B9EDE0", "#B9D7ED", "#DCB9ED", "#8F2323", "#8F6A23",
      "#4F8F23", "#23628F", "#6B238F", "#000000", "#737373", "#CCCCCC"
    ];

    // Flatten the sorted data for cumulative calculations
    let cumulativeCounts: any[] = [];
    this.dvcatTotals.forEach(group => {
      let cumulativeCount = 0;
      group.values.forEach((entry, index) => {
        cumulativeCount += entry.entryCount;
        cumulativeCounts.push({ ...entry, cumulativeCount, color: customColours[index % customColours.length] });
      });
    });

    // Define scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(cumulativeCounts, d => d.cumulativeCount)!])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(this.dvcatTotals.filter(d => d.isChecked).map(d => d.dvcat))
      .range([height, 0])
      .padding(0.1);

    // Create stacked bars
    const bars = svg.selectAll('.bar')
      .data(cumulativeCounts.filter(d => {
        const dvcat = d.dvcat;
        return this.dvcatTotals.find(t => t.dvcat === dvcat && t.isChecked);
      }))
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.cumulativeCount - d.entryCount))
      .attr('y', d => yScale(d.dvcat)!)
      .attr('width', d => xScale(d.entryCount)!)
      .attr('height', yScale.bandwidth())
      .style('fill', d => d.color)
      .on('click', (event: MouseEvent, d: any) => {
        // Filter data for the clicked DVCAT and update the bar chart
        const clickedDvcat = d.dvcat;
        this.updateSecondChart(clickedDvcat);
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
      .text('DVCAT');

    // Add X axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .text('Total number of PDs per DVDECOD');

    // Tooltip interactions
    const tooltip = d3.select(this.elementRef.nativeElement).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    bars.on('mouseover', (event: MouseEvent, d: any) => {
        const xPos = event.pageX;
        const yPos = event.pageY;

        tooltip
          .style('opacity', 1)
          .style('left', (xPos + 20) + 'px')
          .style('top', (yPos - 20) + 'px')
          .html(`<strong>${d.dvdecod}</strong><br>Count: ${d.entryCount}`);
      })
      .on('mousemove', (event: MouseEvent) => {
        const xPos = event.pageX;
        const yPos = event.pageY;

        tooltip
          .style('left', (xPos + 30) + 'px')
          .style('top', (yPos + 20) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  }

  updateSecondChart(clickedDvcat: string) {
	  d3.select(this.elementRef.nativeElement).select('#second-chart').selectAll('*').remove();

	  // Filter data for the clicked DVCAT
	  const filteredData = this.entryCountPerSubcategoryPerCategory.filter(d => d.dvcat === clickedDvcat);

	  const margin = { top: 50, right: 30, bottom: 330, left: 60 };
	  const width = 1500 - margin.left - margin.right;
	  const height = 500 - margin.top - margin.bottom;

	  // Append SVG to the component's element
	  const svg = d3.select(this.elementRef.nativeElement).select('#second-chart').append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${margin.left},${margin.top})`);

	  // Define custom colours
	  const customColours = [
	    "#FF0000", "#FF7F00", "#FFD400", "#FFFF00", "#BFFF00", "#6AFF00",
	    "#00EAFF", "#0095FF", "#0040FF", "#AA00FF", "#FF00AA", "#EDB9B9",
	    "#E7E9B9", "#B9EDE0", "#B9D7ED", "#DCB9ED", "#8F2323", "#8F6A23",
	    "#4F8F23", "#23628F", "#6B238F", "#000000", "#737373", "#CCCCCC"
	  ];

	  // Sort filtered data by entryCount in descending order
	  filteredData.sort((a, b) => d3.descending(a.entryCount, b.entryCount));

	  // Define x and y scales
	  const xScale = d3.scaleBand()
	    .domain(filteredData.map(d => d.dvdecod))
	    .range([0, width])
	    .padding(0.1);

	  const yScale = d3.scaleLinear()
	    .domain([0, d3.max(filteredData, d => d.entryCount)!])
	    .nice()
	    .range([height, 0]);

	  // Create bars
	  svg.selectAll('.bar')
	    .data(filteredData)
	    .enter().append('rect')
	    .attr('class', 'bar')
	    .attr('x', d => xScale(d.dvdecod)!)
	    .attr('y', d => yScale(d.entryCount)!)
	    .attr('width', xScale.bandwidth())
	    .attr('height', d => height - yScale(d.entryCount)!)
	    .style('fill', (d, i) => customColours[i % customColours.length])
	    .on('click', (event: MouseEvent, d: any) => {
	        this.barClicked.emit(d.dvdecod);
	      });

	  // Add x-axis
	  svg.append('g')
	    .attr('class', 'axis')
	    .attr('transform', `translate(0,${height})`)
	    .call(d3.axisBottom(xScale))
	    .selectAll('text')
	    .style('text-anchor', 'end')
	    .attr('dx', '-.8em')
	    .attr('dy', '.15em')
	    .attr('transform', 'rotate(-65)')
	    .call(wrap, 30);

	  // Wrap function to break text into multiple lines
	  function wrap(text: any, width: number) {
	    text.each(function(this: SVGTextElement) {
	      const text = d3.select(this);
	      const words = text.text().split(/\s+/);
	      const y = text.attr('y');
	      const dy = parseFloat(text.attr('dy'));
	      const lineHeight = 1.1; // ems
	      let lineNumber = 0;
	      let line: string[] = [];
	      let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');

	      words.forEach(word => {
	        line.push(word);
	        if (line.join(' ').length > width) {
	          line.pop(); // Remove the word that exceeds the width
	          tspan.text(line.join(' '));
	          line = [word]; // Start a new line with the word that exceeds
	          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
	        } else {
	          tspan.text(line.join(' '));
	        }
	      });
	    });
	  }


	  // Add y-axis
	  svg.append('g')
	    .attr('class', 'axis')
	    .call(d3.axisLeft(yScale).ticks(d3.max(filteredData, d => d.entryCount) || 10).tickFormat(d3.format('d')));


	  // Add chart title
	  svg.append('text')
	    .attr('x', width / 2)
	    .attr('y', -margin.top / 2)
	    .attr('text-anchor', 'middle')
	    .text(`Total number of PD coded terms (DVDECOD) for ${clickedDvcat} at site`);
		  
		// Add Y axis label
	  svg.append('text')
	    .attr('transform', 'rotate(-90)')
	    .attr('x', -height / 2)
	    .attr('y', -margin.left / 1.2)
	    .attr('text-anchor', 'middle')
	    .text('Total number of PDs');

	  // Add X axis label
	  svg.append('text')
	    .attr('x', width / 2)
	    .attr('y', height + margin.bottom / 1.5)
	    .attr('text-anchor', 'middle')
	    .text('DVDECOD name');
	  
	// Tooltip interactions
	  const tooltip = d3.select(this.elementRef.nativeElement).append('div')
	    .attr('class', 'tooltip')
	    .style('opacity', 0)
	    .style('position', 'absolute')
	    .style('background-color', 'white')
	    .style('border', 'solid')
	    .style('border-width', '1px')
	    .style('border-radius', '5px')
	    .style('padding', '10px');

	  svg.selectAll('.bar')
	    .on('mouseover', (event: MouseEvent, d: any) => {
	      const xPos = event.pageX;
	      const yPos = event.pageY;

	      tooltip
	        .style('opacity', 1)
	        .style('left', (xPos + 20) + 'px')
	        .style('top', (yPos - 20) + 'px')
	        .html(`<strong>${d.dvdecod}</strong><br>Count: ${d.entryCount}`);
	    })
	    .on('mousemove', (event: MouseEvent) => {
	      const xPos = event.pageX;
	      const yPos = event.pageY;

	      tooltip
	        .style('left', (xPos + 30) + 'px')
	        .style('top', (yPos + 20) + 'px');
	    })
	    .on('mouseout', () => {
	      tooltip.style('opacity', 0);
	    });
	}

}
