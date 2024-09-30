import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { UserService } from 'src/app/core/services/user.service';
import { PdDvdecod } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-pd-dvdecod-graph',
  templateUrl: './team-pd-dvdecod-graph.component.html',
  styleUrl: './team-pd-dvdecod-graph.component.css'
})
export class TeamPdDvdecodGraphComponent implements OnInit, OnDestroy {
  chart!: Chart;
  private data: PdDvdecod[] = [];
  private filteredData: PdDvdecod[] = [];
  private userSubscription!: Subscription;
  private visSubscription!: Subscription;
  public labels: string[] = this.dataVisualisationService.PdCategories;
  public selectedLabels: string[] = this.labels;
  public isLegendVisible: boolean = false;

  constructor(
    private userService: UserService,
    private dataVisualisationService: DataVisualisationService
  ) { }

  ngOnInit(): void {
    this.subscribeToSelectedTeam();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.visSubscription) this.visSubscription.unsubscribe();
    if (this.chart) this.chart.destroy();
  }

  private subscribeToSelectedTeam(): void {
    this.userSubscription = this.userService.currentUserSelectedTeam$.subscribe((team) => {
      if (team) {
        this.loadBarGraphData(team.teamId);
      }
    });
  }

  private loadBarGraphData(teamId: number): void {
    this.visSubscription = this.dataVisualisationService.getPdDvdecodBarGraphData$(teamId)
      .subscribe(response => {
        this.labels = response.dvcats;
        this.selectedLabels = this.labels;
        this.data = response.data;
        this.filteredData = this.data;
        this.createChart(this.data);
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

  private formatData(data: PdDvdecod[]): any[] {
    return data.map((dataEntry) => ({
      label: dataEntry.dvdecod,
      data: dataEntry.count,
      backgroundColor: dataEntry.colour
    }));
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
          }
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Total number of PDs per DVCAT',
          }
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
