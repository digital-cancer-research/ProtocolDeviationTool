import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chart, CategoryScale } from 'chart.js';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DvdecodGraphService } from './dvdecod-graph.service';
import { DataVisualisationService } from 'src/app/features/data-visualisation-page/data-visualisation.service';
import { DvdecodData } from 'src/app/features/data-visualisation-page/models/team-pd-dvdecod-bar-graph-data.model';

@Component({
  selector: 'app-dvdecod-graph',
  templateUrl: './dvdecod-graph.component.html',
  styleUrl: './dvdecod-graph.component.css'
})
export class DvdecodGraphComponent {

  /** Input data for the graph, an array of dvdecodData objects. */
  @Input() data: DvdecodData[] = [];

  /** Boolean indicating if the default colour mode is enabled.  */
  @Input() isColourModeDefault: boolean = true;

  /** The selected dvdecod */
  @Output() selectedDvdecod: EventEmitter<string> = new EventEmitter();

  /** The Chart.js instance representing the bar graph. */
  chart!: Chart;

  /** Colour palette used for default color mode. */
  colours: string[] = this.dataVisualisationService.barChartColours;


  /**
   * Constructor to inject necessary services.
   * @param dataVisualisationService Service responsible for handling visualisation logic and configurations.
   */
  constructor(
    private dataVisualisationService: DataVisualisationService,
    private dvdecodGraphService: DvdecodGraphService
  ) { }

  /**
   * Lifecycle hook triggered when input properties change.
   * Creates a graph if valid data is received.
   * @param changes Object containing changes to input-bound properties.
   */
  ngOnChanges(): void {
    this.setColours();
    if (this.data && this.data.length > 0) {
      if (this.chart) {
        this.updateChart();
      } else {
        this.createChart();
      }
    }
  }

  /**
   * Sets the colours for the bar chart depending on the colour mode, or given input.
   * @param customColours Optional set of colours 
   * @returns {void} 
   */
  setColours(customColours?: string[]): void {
    if (customColours) {
      this.colours = customColours;
    }
    if (this.isColourModeDefault) {
      this.colours = this.dataVisualisationService.barChartColours;
    } else {
      this.colours = this.data.map(dataEntry => dataEntry.backgroundColor);
    }
  }

  /**
   * Creates a new chart
   */
  createChart() {
    this.chart = this.dvdecodGraphService.createChart(this.data, this.colours);
  }

  /**
   * Updates an already existing graph
   */
  updateChart() {
    let newLabels: string[] = this.data.map(dataEntry => dataEntry.dvdecod);
    this.chart.data.datasets = this.dvdecodGraphService.formatDataForUpdating(this.data, this.colours);
    this.chart.data.labels = newLabels;
    if (this.chart.options.plugins && this.chart.options.plugins.title) {
      this.chart.options.plugins.title.text = `Total number of PD coded terms (DVDECOD) for ${this.data[0].dvcat} for team`;
    } 
    this.chart.update();
  }

  /**
   * Handles click event on chart, to generate table, if conditions match.
   * Only generates if the click below the x-axis.
   * Generates a table associated with the closest dvdecod on the graph.
   * @param event 
   */
  public onClick(event: any): void {
    let click = event as PointerEvent;
    let x = click.layerX;
    let y = click.layerY;
    let xAxis = (this.chart.scales['x']) as CategoryScale;

    const labels = xAxis.getLabelItems().map((label) => {
      let xPosition = label.options.translation?.[0];
      let labelStr = label.label;
      if (Array.isArray(labelStr)) {
        labelStr = labelStr.join(', ');
      } else {
        labelStr = labelStr.toString();
      }
      return {
        label: labelStr,
        xCoordinate: xPosition ? xPosition : 0
      }
    })

    let yThreshold = this.chart.chartArea.bottom;
    if (y > yThreshold) {
      let labelsPosition = labels.map(label => label.xCoordinate);
      let selectedLabelPosition = UtilsService.findClosestNumberInSortedNumberArray(labelsPosition, x);
      let selectedLabel = labels.filter(label => label.xCoordinate === selectedLabelPosition)[0].label;
      this.selectedDvdecod.emit(selectedLabel);
    }
  }
}
