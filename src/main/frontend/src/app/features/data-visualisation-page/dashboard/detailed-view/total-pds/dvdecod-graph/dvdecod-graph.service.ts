import { Injectable } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { DvdecodData } from 'src/app/features/data-visualisation-page/models/team-pd-dvdecod-bar-graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class DvdecodGraphService {

  constructor() { }

  private static readonly canvasId: string = 'dvdecodGraph';

  /**
  * Creates a Chart.js bar chart based on the input dvdecodData.
  * Destroys the previous chart instance if it exists.
  * @param data The dvdecodData array to visualize.
  */
  createChart(data: DvdecodData[], colours: string[]): Chart {
    const labels = data.map(dataEntry => dataEntry.dvdecod);
    const dataFormatted = data.map(dataEntry => dataEntry.count);

    return new Chart(DvdecodGraphService.canvasId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: dataFormatted,
          backgroundColor: colours
        }]
      },
      options: this.getChartOptions(data),
    });
  }


  /**
   * Returns data needed for updated a chart.js graph.
   * @param data Data to use instead.
   * @param colours Colours to use instead.
   * @returns 
   */
  formatDataForUpdating(data: DvdecodData[], colours: string[]) {
    const dataFormatted = data.map(dataEntry => dataEntry.count);
    const dataset = [{
      data: dataFormatted,
      backgroundColor: colours
    }]
    return dataset
  }

  /**
  * Returns the Chart.js options for the bar chart.
  * Dynamically generates titles and axis labels based on the first data entry's `dvcat`.
  */
  getChartOptions(data: DvdecodData[]): ChartOptions {
    const dvcat = data[0]?.dvcat || '';
    return {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total number of PDs',
          },
        },
        x: {
          title: {
            display: true,
            text: 'DVDECOD',
          },
          ticks: {
            autoSkip: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: this.getTitle(dvcat)
        },
      }
    };
  }

  /**
   * Returns the title for the bar chart based on the given `dvcat`.
   *
   * @param dvcat - The `dvcat` value to use in the title.
   * @returns A string representing the title for the bar chart.
   *
   * @example
   * ```typescript
   * const dvcat = 'Example Category';
   * const title = getTitle(dvcat);
   * console.log(title); // Output: "Total number of PD coded terms (DVDECOD) for Example Category"
   * ```
   */
  getTitle(dvcat: string): string {
    return `Total number of PD coded terms (DVDECOD) for ${dvcat}`;
  }
}