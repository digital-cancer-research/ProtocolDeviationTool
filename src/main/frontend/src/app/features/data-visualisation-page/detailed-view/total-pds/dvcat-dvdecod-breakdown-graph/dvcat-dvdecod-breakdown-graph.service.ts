import { Injectable } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { DataVisualisationService } from '../../../data-visualisation.service';
import { PdDvdecod } from '../../../models/team-pd-dvdecod-bar-graph-data.model';

@Injectable({
  providedIn: 'root'
})
export class DvcatDvdecodBreakdownGraphService {
  private colours: string[] = this.dataVisualisationService.barChartColours
  private static readonly graphId: string = 'dvcatDvdecodBreakdownGraph';
  private static readonly skeletonGraphId: string = 'dvcatDvdecodBreakdownSkeletonGraph';
  /**
   * Creates an instance of TeamPdDvdecodGraphService.
   * @param {DataVisualisationService} dataVisualisationService - Service for data visualisation that provides an iridescent colour scheme.
   */
  constructor(
    private dataVisualisationService: DataVisualisationService
  ) { }

  /**
   * Formats the given PD data based on the color mode setting.
   * @param {PdDvdecod[]} data - The PD data to be formatted.
   * @param {boolean} isColourModeDefault - Indicates if the default color mode is used.
   * @returns {any[]} An array of formatted data for chart representation.
   */
  formatData(data: PdDvdecod[], isColourModeDefault: boolean): any[] {
    if (!isColourModeDefault) {
      return data.map((dataEntry) => ({
        label: dataEntry.dvdecod,
        data: dataEntry.count,
        backgroundColor: dataEntry.colour
      }));
    } else {
      const groupedData: { [dvcat: string]: PdDvdecod[] } = data.reduce((acc, dataEntry) => {
        if (!acc[dataEntry.dvcat]) {
          acc[dataEntry.dvcat] = [];
        }
        acc[dataEntry.dvcat].push(dataEntry);
        return acc;
      }, {} as { [dvcat: string]: PdDvdecod[] });

      for (const dvcat in groupedData) {
        groupedData[dvcat].sort((a, b) => {
          const countA = a.count.find(val => val !== 0) || 0;
          const countB = b.count.find(val => val !== 0) || 0;
          return countB - countA;
        });
      }

      const updatedData: { label: string, data: number[], backgroundColor: string }[] = [];
      for (const dvcat in groupedData) {
        let colourIndex = 0;

        groupedData[dvcat].forEach((dataEntry) => {
          const updatedColour = this.colours[colourIndex % this.colours.length];
          colourIndex++;

          updatedData.push({
            label: dataEntry.dvdecod,
            data: dataEntry.count,
            backgroundColor: updatedColour
          });
        });
      }
      return updatedData;
    }
  }

  /**
   * Creates a bar chart using the given datasets and options.
   * @param {any} datasets - The datasets to be included in the chart.
   * @param {string[]} labels - The labels for the chart axes.
   * @param {boolean} isColourModeDefault - Indicates if the default color mode is used.
   * @param {boolean} isLegendVisible - Indicates if the legend should be displayed.
   * @returns {Chart} The created Chart instance.
   */
  createChart(datasets: any, labels: string[], isColourModeDefault: boolean, isLegendVisible: boolean): Chart {
    return new Chart(DvcatDvdecodBreakdownGraphService.graphId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: !isColourModeDefault ? this.getChartOptions(isLegendVisible) :
        this.getChartOptionsWithGradientColours(datasets.map((dataEntry: { backgroundColor: any; }) => dataEntry.backgroundColor), isLegendVisible),
    });
  }

  /**
   * Creates a skeleton chart for loading visualization.
   * @param {string[]} labels - The labels for the skeleton chart.
   * @returns {Chart} The created skeleton Chart instance.
   */
  createSkeletonChart(labels: string[]): Chart {
    return new Chart(DvcatDvdecodBreakdownGraphService.skeletonGraphId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: labels.map((label, index) => {
          let count: number[] = new Array(10).fill(0);
          count[index] = index + 1;
          return {
            label: label,
            data: count,
            backgroundColor: '#EFF1f6'
          };
        })
      },
      options: this.getSkeletonChartOptions(false),
    });
  }

  /**
   * Retrieves the chart options based on the legend visibility setting.
   * @param {boolean} isLegendVisible - Indicates if the legend should be visible.
   * @returns {any} The chart options.
   */
  getChartOptions(isLegendVisible: boolean): any {
    return {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          title: {
            display: true,
            text: 'DVCAT',
          },
          ticks: {
            color: 'rgb(100,100,100)',
          },
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Total number of PDs per DVCAT',
          },
          ticks: {
            color: 'rgb(100,100,100)',
          },
        },
      },
      indexAxis: 'y',
      plugins: {
        legend: {
          display: isLegendVisible
        },
        title: {
          display: true,
          text: 'Total number of protocol deviations within each category for protocol deviation (DVCAT)'
        },
      }
    };
  }

  /**
   * Retrieves the chart options when gradient colors are used.
   * @param {string[]} colours - The colors to be used for the chart.
   * @param {boolean} isLegendVisible - Indicates if the legend should be visible.
   * @returns {any} The chart options including gradient colors.
   */
  getChartOptionsWithGradientColours(colours: string[], isLegendVisible: boolean): any {
    const usedColors = Array.from(new Set(colours));
    return {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          title: {
            display: true,
            text: 'DVCAT',
          },
          ticks: {
            color: 'rgb(100,100,100)',
          },
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Total number of PDs per DVCAT',
          },
          ticks: {
            color: 'rgb(100,100,100)',
          },
        },
      },
      indexAxis: 'y',
      plugins: {
        legend: {
          display: isLegendVisible,
          labels: {
            generateLabels: () => {
              return usedColors.map(color => ({
                text: '',
                fillStyle: color,
                strokeStyle: color,
                hidden: false,
                lineCap: 'round',
              }));
            }
          }
        },
        title: {
          display: true,
          text: 'Total number of protocol deviations within each category for protocol deviation (DVCAT)'
        },
      }
    };
  }

  /**
   * Retrieves the options for the skeleton chart.
   * @param {boolean} isLegendVisible - Indicates if the legend should be visible.
   * @returns {ChartOptions} The skeleton chart options.
   */
  getSkeletonChartOptions(isLegendVisible: boolean): ChartOptions {
    const colour = '#EFF1f6';
    const defaultChartOptions = this.getChartOptions(false);
    return {
      ...defaultChartOptions,
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          title: {
            display: true,
            text: 'DVCAT',
            color: colour
          },
          ticks: {
            color: colour,
          },
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Total number of PDs per DVCAT',
            color: colour
          },
          ticks: {
            color: colour,
          },
        },
      },
      animation: {
        easing: 'easeInOutCubic',
        duration: 4000,
        loop: true,
      },
      plugins: {
        ...defaultChartOptions.plugins,
        tooltip: {
          enabled: false,
        },
        title: {
          display: true,
          text: 'Total number of protocol deviations within each category for protocol deviation (DVCAT)',
          color: colour
        }
      },
    };
  }
}
