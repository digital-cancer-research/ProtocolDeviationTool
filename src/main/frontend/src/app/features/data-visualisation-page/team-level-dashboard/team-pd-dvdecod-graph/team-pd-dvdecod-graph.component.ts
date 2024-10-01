import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
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
      panelClass: ["test"]
    });
  }

  chart!: Chart;
  private data: PdDvdecod[] = [];
  private filteredData: PdDvdecod[] = [];
  private userSubscription!: Subscription;
  private visSubscription!: Subscription;
  public labels: string[] = this.dataVisualisationService.PdCategories;
  public selectedLabels: string[] = this.labels;
  public isLegendVisible: boolean = false;
  public isDataLoading: boolean = true;
  public errorMessage: string = "";

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
          this.errorMessage = `No team selected. \n Please select a team.`;
          this.openSnackBar(this.errorMessage, "");
        }
      },
      error: (error) => {
        this.isDataLoading = false;
        this.errorMessage = error.message || "An error occurred while trying to load the data. \n Please try again later."; 
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
          this.errorMessage = error.message || "An error occurred while trying to load the data. \n Please try again later."; 
          this.openSnackBar(this.errorMessage, "");
        }
      });
  }

  private createChart(data: PdDvdecod[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('teamPdDvdecodGraph', {
      type: 'bar',
      data: {
        labels: this.selectedLabels,
        datasets: this.formatData(data)
      },
      options: this.chartOptions,
    });
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
          count[index] = Math.random() + index;
          return {
            label: label,
            data: count,
            backgroundColor: '#EFF1f6'
          };
        }).sort((a, b) => {
          const maxValueA = Math.max(...a.data);
          const maxValueB = Math.max(...b.data);
          return maxValueB - maxValueA;
        })
      },
      options: this.skeletonChartOptions,
    });
  }


  private formatData(data: PdDvdecod[]): any[] {
    return data.map((dataEntry) => ({
      label: dataEntry.dvdecod,
      data: dataEntry.count,
      backgroundColor: dataEntry.colour
    }));
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
}
