import { AfterViewInit, Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { CategoryScale, Chart, ChartOptions } from 'chart.js';
import { DataVisualisationService } from '../../data-visualisation.service';
import { UserService } from 'src/app/core/services/user.service';
import { dvdecodData, PdDvdecod } from '../../models/team-pd-dvdecod-bar-graph-data.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamPdDvdecodGraphService } from './team-pd-dvdecod-graph.service';
import { UtilsService } from 'src/app/core/services/utils.service';

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
  public labels: string[] = this.dataVisualisationService.pdCategories;
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
    // this.createSkeletonChart();
    // this.subscribeToSelectedTeam();
    this.isDataLoading = false;
    this.data = mockData.data;
    this.filteredData = mockData.data;
    this.labels = mockData.dvcats
    this.selectedLabels = mockData.dvcats
    setTimeout(() => {
      this.createChart();
    })
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
      let selectedLabelPosition = UtilsService.findClosestNumberInSortedNumberArray(labelPositions.map(label => label.y), y);
      if (selectedLabelPosition) {
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
}

const mockData = { "dvcats": ["ELIGIBILITY CRITERIA NOT MET", "EXCLUDED MEDICATION, VACCINE OR DEVICE", "INFORMED CONSENT", "NOT WITHDRAWN AFTER DEVELOPING WITHDRAWAL CRITERIA", "SITE LEVEL ERROR", "FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL", "WRONG STUDY TREATMENT/ADMINISTRATION/DOSE", "STUDY PROCEDURE", "VISIT COMPLETION", "ASSESSMENT OR TIME POINT COMPLETION"], "data": [{ "dvcat": "VISIT COMPLETION", "dvdecod": "MISSED VISIT/PHONE CONTACT", "count": [0, 0, 0, 0, 0, 0, 0, 0, 9, 0], "colour": "#FF9800" }, { "dvcat": "STUDY PROCEDURE", "dvdecod": "BIOLOGICAL SAMPLE SPECIMEN PROCEDURE", "count": [0, 0, 0, 0, 0, 0, 0, 6, 0, 0], "colour": "#673AB7" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT- VITAL SIGNS", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 5], "colour": "#8BC34A" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - VITAL SIGNS", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 5], "colour": "#E91E63" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - OTHER", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 5], "colour": "#3F51B5" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - BLOODS LOCAL", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 5], "colour": "#CDDC39" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - TREATMENT ADMINISTRATION", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 3], "colour": "#0F9D58" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - PK COLLECTION", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 3], "colour": "#2196F3" }, { "dvcat": "FAILURE TO REPORT SAFETY EVENTS PER PROTOCOL", "dvdecod": "SAE NOT REPORTED WITHIN THE EXPECTED TIME FRAME", "count": [0, 0, 0, 0, 0, 2, 0, 0, 0, 0], "colour": "#2196F3" }, { "dvcat": "WRONG STUDY TREATMENT/ADMINISTRATION/DOSE", "dvdecod": "STUDY TREATMENT NOT ADMINISTERED PER PROTOCOL", "count": [0, 0, 0, 0, 0, 0, 2, 0, 0, 0], "colour": "#E91E63" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - EFFICACY ASSESSMENT", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], "colour": "#DB4437" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "MISSED ASSESMENT - EFFICACY ASSESSMENT", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], "colour": "#009688" }, { "dvcat": "WRONG STUDY TREATMENT/ADMINISTRATION/DOSE", "dvdecod": "STUDY TREATMENT NOT PREPARED AS PER PROTOCOL (E.G. RECONSTITUTION)", "count": [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], "colour": "#673AB7" }, { "dvcat": "ASSESSMENT OR TIME POINT COMPLETION", "dvdecod": "OUT OF WINDOW - ECG", "count": [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], "colour": "#3F51B5" }] };