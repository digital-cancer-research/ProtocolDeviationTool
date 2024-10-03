import { Injectable } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { dvdecodData } from '../../models/team-pd-dvdecod-bar-graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class DvdecodBarGraphService {

  constructor() { }

  /**
  * Creates a Chart.js bar chart based on the input dvdecodData.
  * Destroys the previous chart instance if it exists.
  * @param data The dvdecodData array to visualize.
  */
  createChart(data: dvdecodData[], colours: string[]): Chart {
    const labels = data.map(dataEntry => dataEntry.dvdecod);
    const dataFormatted = data.map(dataEntry => dataEntry.count);

    return new Chart('dvdecodGraph', {
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
  * Returns the Chart.js options for the bar chart.
  * Dynamically generates titles and axis labels based on the first data entry's `dvcat`.
  */
  getChartOptions(data: dvdecodData[]): ChartOptions {
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
        },
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `Total number of PD coded terms (DVDECOD) for ${dvcat} at site`
        },
      }
    };
  }
}
