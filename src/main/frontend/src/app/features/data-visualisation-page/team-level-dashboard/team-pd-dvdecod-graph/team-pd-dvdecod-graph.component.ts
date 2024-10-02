import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { ActiveElement, CategoryScale, Chart, ChartOptions } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { UserService } from 'src/app/core/services/user.service';
import { PdDvdecod } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-pd-dvdecod-graph',
  templateUrl: './team-pd-dvdecod-graph.component.html',
  styleUrl: './team-pd-dvdecod-graph.component.css',
})
export class TeamPdDvdecodGraphComponent implements AfterViewInit, OnDestroy {

  private _snackBar = inject(MatSnackBar);
  duration = 5000;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.duration,
      panelClass: ["test"],
    });
  }

  chart!: Chart;
  private data: PdDvdecod[] = [];
  private filteredData: PdDvdecod[] = [];
  private userSubscription!: Subscription;
  private visSubscription!: Subscription;
  private colours: string[] = this.dataVisualisationService.dvdecodColours
  public labels: string[] = this.dataVisualisationService.PdCategories;
  public selectedLabels: string[] = this.labels;
  public isLegendVisible: boolean = false;
  public isDataLoading: boolean = false;
  public errorMessage: string = "";
  public isColourModeDefault: boolean = true;

  constructor(
    private userService: UserService,
    private dataVisualisationService: DataVisualisationService
  ) { }

  ngAfterViewInit(): void {
    this.createSkeletonChart();
    this.subscribeToSelectedTeam();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.visSubscription) this.visSubscription.unsubscribe();
    if (this.chart) this.chart.destroy();
  }

  private subscribeToSelectedTeam(): void {
    this.userSubscription = this.userService.currentUserSelectedTeam$.subscribe({
      next: (team) => {
        this.isDataLoading = false;
        if (team) {
          this.loadBarGraphData(team.teamId);
        } else {
          this.errorMessage = `An error occurred while trying to load the data - no team selected. 
          Please select a team and try again.`;
          this.openSnackBar(this.errorMessage, "");
        }
      },
      error: (error) => {
        this.isDataLoading = false;
        this.errorMessage = error.message || `An error occurred while trying to load the data. 
        Please try again later.`;
        this.openSnackBar(this.errorMessage, "");
      }
    });
  }

  private loadBarGraphData(teamId: number): void {
    this.visSubscription = this.dataVisualisationService.getPdDvdecodBarGraphData$(teamId)
      .subscribe({
        next: (response) => {
          this.labels = response.dvcats;
          this.selectedLabels = this.labels;
          this.data = response.data;
          this.filteredData = this.data;
          this.createChart(this.data);
        },
        error: (error) => {
          this.isDataLoading = false;
          this.errorMessage = error.message || `An error occurred while trying to load the data. 
          Please try again later.`;
          this.openSnackBar(this.errorMessage, "");
        }
      });
  }

  private createChart(data: PdDvdecod[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    let datasets = this.formatData(data);
    if (this.isColourModeDefault) {
      this.chart = new Chart('teamPdDvdecodGraph', {
        type: 'bar',
        data: {
          labels: this.selectedLabels,
          datasets: datasets
        },
        options: this.getChartOptionsWithGradientColours(datasets.map(
          dataEntry => dataEntry.backgroundColor
        )),
      });
    } else {
      this.chart = new Chart('teamPdDvdecodGraph', {
        type: 'bar',
        data: {
          labels: this.selectedLabels,
          datasets: datasets
        },
        options: this.chartOptions,
      });
    }
  }

  private createSkeletonChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('teamPdDvdecodSkeletonGraph', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.labels.map((label, index) => {
          let count: number[] = new Array(10).fill(0);
          count[index] = index + 1;
          return {
            label: label,
            data: count,
            backgroundColor: '#EFF1f6'
          };
        })
      },
      options: this.skeletonChartOptions,
    });
  }


  private formatData(data: PdDvdecod[]): any[] {
    if (!this.isColourModeDefault) {
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

      const updatedData: {label:string, data: number[], backgroundColor: string}[] = [];
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

  private get skeletonChartOptions(): ChartOptions {
    const colour = '#EFF1f6';
    return {
      ...this.chartOptions,
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
        ...this.chartOptions.plugins,
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

  private get chartOptions(): any {
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
          display: this.isLegendVisible
        },
        title: {
          display: true,
          text: 'Total number of protocol deviations within each category for protocol deviation (DVCAT)'
        },
      }
    };
  }

  private getChartOptionsWithGradientColours(colours: string[]): ChartOptions {
    const usedColors = Array.from(new Set(colours));

    return {
      ...this.chartOptions,
      plugins: {
        legend: {
          display: this.isLegendVisible,
          labels: {
            generateLabels: (chart) => {
              return usedColors.map(color => ({
                text: '',
                fillStyle: color,
                strokeStyle: color,
                hidden: false,
                lineCap: 'round',
              }));
            }
          }
        }
      }
    };
  }


  public updateChart(selectedDvcats: string[]): void {
    this.selectedLabels = this.labels.filter(dvcat => selectedDvcats.includes(dvcat));
    const selectedLabelsIndices = this.selectedLabels.map(dvcat => this.labels.indexOf(dvcat));

    this.filteredData = this.data
      .map(dataEntry => ({
        ...dataEntry,
        count: this.getFilteredCount(dataEntry.count, selectedLabelsIndices)
      }))
      .filter(dataEntry => !dataEntry.count.every(count => count === 0));

    this.createChart(this.filteredData);
  }

  private getFilteredCount(countArray: number[], indices: number[]): number[] {
    return indices.map(index => countArray[index]);
  }

  public toggleLegend(): void {
    this.isLegendVisible = !this.isLegendVisible;
    this.createChart(this.filteredData);
  }

  public toggleColourMode(): void {
    this.createChart(this.filteredData);
  }

  public onClick(event: any): void {
    let click = event as PointerEvent;
    let x = click.layerX;
    let y = click.layerY;
    let yAxis = (this.chart.scales['y'] as CategoryScale);
    let labelPositions = yAxis.getLabelItems().map((label) => {
      let pos = label.options.translation?.[1];
      return {
        label: label,
        y: pos ? pos : 0
      }
    });
    console.log(labelPositions);
    let xThreshold = yAxis.getLabelItems()[0].options.translation?.[0];
    console.log('xThreshold');
    console.log(xThreshold);
    if (xThreshold !== undefined && x < xThreshold) {
      let selectedLabelPosition = this.getClosestNumber(labelPositions.map(label => label.y), y);
      console.log('selectedLabelPosition');
      console.log(selectedLabelPosition);
      console.log('x');
      console.log(x);
      if (selectedLabelPosition !== null) {
        console.log(labelPositions[labelPositions.map(label => label.y).indexOf(selectedLabelPosition)].label.label);
      }
    }

  }

  private getClosestNumber(array: number[], target: number): number | null {
    if (array.length === 0) {
      return null;
    }
    if (array.length === 1) {
      return array[0];
    }
    let pivot = Math.floor(array.length / 2);
    if (array[pivot] > target) {
      return this.getClosestNumber(array.slice(0, pivot), target);
    } else {
      return this.getClosestNumber(array.slice(pivot, array.length), target);
    }
  }
}