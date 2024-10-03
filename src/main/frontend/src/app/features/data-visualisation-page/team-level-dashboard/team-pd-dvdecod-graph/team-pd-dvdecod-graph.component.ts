import { AfterViewInit, Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { CategoryScale, Chart, ChartOptions } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { UserService } from 'src/app/core/services/user.service';
import { dvdecodData, PdDvdecod } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamPdDvdecodGraphService } from './team-pd-dvdecod-graph.service';

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
      duration: this.duration
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
  public isDataLoading: boolean = true;
  public errorMessage: string = "";
  public isColourModeDefault: boolean = true;
  @Output() dvdecodGraphData: EventEmitter<dvdecodData[]> = new EventEmitter();
  @Output() colourMode: EventEmitter<boolean> = new EventEmitter(true);

  constructor(
    private userService: UserService,
    private dataVisualisationService: DataVisualisationService,
    private teamPdDvdecodGraphService: TeamPdDvdecodGraphService
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
          this.handleError();
        }
      },
      error: (error) => {
        this.errorMessage = error.message || `An error occurred while trying to load the data. 
        Please try again later.`;
        this.handleError();
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
          this.createChart();
        },
        error: (error) => {
          this.errorMessage = error.message || `An error occurred while trying to load the data. 
          Please try again later.`;
          this.handleError();
        }
      });
  }

  private handleError(): void {
    this.isDataLoading = false;
    setTimeout(() => {
      this.createChart();
    }, 0)
    this.openSnackBar(this.errorMessage, "");
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    let datasets = this.teamPdDvdecodGraphService.formatData(
      this.filteredData,
      this.isColourModeDefault
    );
    this.chart = this.teamPdDvdecodGraphService.createChart(
      datasets,
      this.selectedLabels,
      this.isColourModeDefault,
      this.isLegendVisible
    )
  }

  private createSkeletonChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = this.teamPdDvdecodGraphService.createSkeletonChart(this.labels);
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
    this.createChart();
  }

  private getFilteredCount(countArray: number[], indices: number[]): number[] {
    return indices.map(index => countArray[index]);
  }

  public toggleLegend(): void {
    this.isLegendVisible = !this.isLegendVisible;
    this.createChart();
  }

  public toggleColourMode(): void {
    this.createChart();
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

    let xThreshold = yAxis.getLabelItems()[0].options.translation?.[0];
    if (xThreshold !== undefined && x < xThreshold) {
      let selectedLabelPosition = this.getClosestNumber(labelPositions.map(label => label.y), y);
      if (selectedLabelPosition !== null) {
        let selectedLabel = labelPositions[labelPositions.map(label => label.y).indexOf(selectedLabelPosition)].label.label;
        let dvdecodData = this.data.filter(dataEntry => dataEntry.dvcat === selectedLabel)
          .map((data) => {
            return {
              dvcat: data.dvcat,
              dvdecod: data.dvdecod,
              count: Math.max(...data.count),
              backgroundColor: data.colour
            } as dvdecodData;
          });
        this.colourMode.emit(this.isColourModeDefault);
        this.dvdecodGraphData.emit(dvdecodData);
      }
    }

  }

  private getClosestNumber(array: number[], target: number): number | null {
    let size = array.length;
    if (size == 1) {
      return array[0];
    }
    if (size == 2) {
      if (target < array[0]) {
        return array[0];
      } else if (target > array[1]) {
        return array[1];
      } else {
        let diffLow = target - array[0];
        let diffHigh = array[1] - target;
        if (diffLow < diffHigh) {
          return array[0];
        } else {
          return array[1];
        }
      }
    }

    let pivot = Math.floor(size / 2);
    let pivotValue = array[pivot];
    if (target > pivotValue) {
      return this.getClosestNumber(array.slice(pivot), target)
    } else {
      return this.getClosestNumber(array.slice(0, pivot + 1), target)
    }
  }
}