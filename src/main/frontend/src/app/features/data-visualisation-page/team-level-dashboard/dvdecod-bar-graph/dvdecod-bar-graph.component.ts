import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { dvdecodData } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { Chart, ChartOptions } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { DvdecodBarGraphService } from './dvdecod-bar-graph.service';

@Component({
  selector: 'app-dvdecod-bar-graph',
  templateUrl: './dvdecod-bar-graph.component.html',
  styleUrls: ['./dvdecod-bar-graph.component.css']
})
export class DvdecodBarGraphComponent implements OnChanges {

  /** Input data for the graph, an array of dvdecodData objects. */
  @Input() data: dvdecodData[] = [];

  /** Boolean indicating if the default colour mode is enabled.  */
  @Input() isColourModeDefault: boolean = true;

  /** The Chart.js instance representing the bar graph. */
  chart!: Chart;

  /** Colour palette used for default color mode. */
  colours: string[] = this.dataVisualisationService.dvdecodColours;

  /**
   * Constructor to inject necessary services.
   * @param dataVisualisationService Service responsible for handling visualisation logic and configurations.
   */
  constructor(
    private dataVisualisationService: DataVisualisationService,
    private dvdecodBarGraphService: DvdecodBarGraphService
  ) { }

  /**
   * Lifecycle hook triggered when input properties change.
   * Creates a graph if valid data is received.
   * @param changes Object containing changes to input-bound properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      if (this.chart) {
        this.chart.destroy();
      }

      if (this.isColourModeDefault) {
        this.colours = this.dataVisualisationService.dvdecodColours;
      } else {
        this.colours = this.data.map(dataEntry => dataEntry.backgroundColor);
      }

      this.chart = this.dvdecodBarGraphService.createChart(this.data, this.colours);
    }
  }  
}
