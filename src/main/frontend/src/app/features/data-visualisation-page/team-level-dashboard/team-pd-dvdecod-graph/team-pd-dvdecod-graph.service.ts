import { Injectable } from '@angular/core';
import { PdDvdecod } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { DataVisualisationService } from '../../data-visualisation.service';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class TeamPdDvdecodGraphService {
  private colours: string[] = this.dataVisualisationService.dvdecodColours

  constructor(
    private dataVisualisationService: DataVisualisationService
  ) { }

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

  createChart(datasets: any, labels: string[], isColourModeDefault: boolean, isLegendVisible: boolean): Chart {
    return new Chart('teamPdDvdecodGraph', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: !isColourModeDefault ? this.getChartOptions(isLegendVisible) :
        this.getChartOptionsWithGradientColours(datasets.map((dataEntry: { backgroundColor: any; }) => dataEntry.backgroundColor), isLegendVisible),
    });
  }

  createSkeletonChart(labels: string[]): Chart {
    return new Chart('teamPdDvdecodSkeletonGraph', {
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
