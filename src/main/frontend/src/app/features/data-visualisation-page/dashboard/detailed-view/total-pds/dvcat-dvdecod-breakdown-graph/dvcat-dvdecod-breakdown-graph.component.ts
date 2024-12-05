import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, CategoryScale } from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { UserService } from 'src/app/core/services/user.service';
import { DvcatDvdecodBreakdownGraphService } from './dvcat-dvdecod-breakdown-graph.service';
import { DataVisualisationService } from 'src/app/features/data-visualisation-page/data-visualisation.service';
import { PdDvdecod, DvdecodData, PdDvdecodBarGraphData } from 'src/app/features/data-visualisation-page/models/team-pd-dvdecod-bar-graph-data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dvcat-dvdecod-breakdown-graph',
  templateUrl: './dvcat-dvdecod-breakdown-graph.component.html',
  styleUrl: './dvcat-dvdecod-breakdown-graph.component.css'
})
export class DvcatDvdecodBreakdownGraphComponent {

  private _snackBar = inject(MatSnackBar);
  duration = 5000;

  /** Opens a snackbar notification with the provided message and action. */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.duration
    });
  }

  /** The chart instance for the visualisation. */
  chart!: Chart;

  /** Array of protocol deviation data. */
  private data: PdDvdecod[] = [];

  /** Array of filtered protocol deviation data based on user selection. */
  private filteredData: PdDvdecod[] = [];

  /** Subscription for user service to track selected team changes. */
  private userSubscription!: Subscription;

  /** Subscription for visualisation service to track data changes. */
  private visSubscription!: Subscription;

  /** Currently selected studyId */
  private studyId?: string;

  /** The labels for the chart categories. */
  public labels: string[] = this.dataVisualisationService.pdCategories;

  /** The currently selected labels for the chart. */
  public selectedLabels: string[] = this.labels;

  /** Flag to control the visibility of the chart legend. */
  public isLegendVisible: boolean = true;

  /** Flag to indicate if data is currently loading. */
  public isDataLoading: boolean = true;

  /** Error message to display when data loading fails. */
  public errorMessage: string = "";

  /** Flag to indicate if the color mode is default. */
  public isColourModeDefault: boolean = false;

  /** Indicates whether the panel for the filters is scrollable - true when expanded */
  public panelOpenState = signal(false);

  /** Output event emitter for sending graph data to parent components. */
  @Output() dvdecodGraphData: EventEmitter<DvdecodData[]> = new EventEmitter();

  /** Output event emitter for toggling color mode. */
  @Output() colourMode: EventEmitter<boolean> = new EventEmitter(true);

  /**
   * Initialises the component and injects the required services.
   * 
   * @param userService - used to fetch team Id for the users selected team for further API requests.
   * @param dataVisualisationService - Service for managing data visualisation-related requests.
   * @param dvcatDvdecodBreakdownGraphService - Service for handling graph-related data formatting and creation.
   */
  constructor(
    private userService: UserService,
    private dataVisualisationService: DataVisualisationService,
    private dvcatDvdecodBreakdownGraphService: DvcatDvdecodBreakdownGraphService,
    private route: ActivatedRoute
  ) {

  }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialised.
   * Creates a skeleton chart while the user waits and subscribes to the currently selected team to fetch relevant data.
   */
  ngAfterViewInit(): void {
    this.createSkeletonChart();
    this.route.queryParams.subscribe(params => {
      this.studyId = params['studyId'];
      this.updateData();
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from active subscriptions and destroys the chart.
   */
  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.visSubscription) this.visSubscription.unsubscribe();
    if (this.chart) this.chart.destroy();
  }

  updateData() {
    let apiRequest: Observable<PdDvdecodBarGraphData> | null = null;
    if (this.studyId !== undefined) {
      apiRequest = this.dataVisualisationService.getPdDvdecodBarGraphDataByStudy$(this.studyId);
    }
    this.userService.currentUserSelectedTeam$.subscribe({
      next: (team) => {
        this.isDataLoading = false;
        if (team !== null) {
          if (apiRequest === null) {
            apiRequest = this.dataVisualisationService.getPdDvdecodBarGraphDataByTeam$(team.teamId);
          }
          this.fetchGraphData(apiRequest);
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

  };

  fetchGraphData(apiRequest: Observable<PdDvdecodBarGraphData>): void {
    this.visSubscription = apiRequest.subscribe({
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

  /**
  * Handles error scenarios by displaying an error message and resetting the loading state.
  */
  private handleError(): void {
    this.isDataLoading = false;
    setTimeout(() => {
      this.createChart();
    }, 0)
    this.openSnackBar(this.errorMessage, "");
  }

  /**
   * Creates or updates the chart with the current filtered data and selected labels.
   */
  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    let datasets = this.dvcatDvdecodBreakdownGraphService.formatData(
      this.filteredData,
      this.isColourModeDefault
    );
    this.chart = this.dvcatDvdecodBreakdownGraphService.createChart(
      datasets,
      this.selectedLabels,
      this.isColourModeDefault,
      this.isLegendVisible
    )
  }

  /**
   * Creates a skeleton chart to display while data is loading.
   */
  private createSkeletonChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = this.dvcatDvdecodBreakdownGraphService.createSkeletonChart(this.labels);
  }

  /**
   * Updates the chart based on the selected categories.
   * 
   * @param selectedDvcats - An array of selected category names to filter the chart data.
   */
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

  /**
   * Retrieves the counts from the count array based on the selected indices.
   * 
   * @param countArray - An array of counts corresponding to the categories.
   * @param indices - An array of indices to filter the count array.
   * @returns An array of filtered counts corresponding to the selected indices.
   */
  private getFilteredCount(countArray: number[], indices: number[]): number[] {
    return indices.map(index => countArray[index]);
  }

  /**
   * Toggles the visibility of the chart legend and updates the chart.
   */
  public toggleLegend(): void {
    this.isLegendVisible = !this.isLegendVisible;
    this.createChart();
  }

  /**
   * Toggles the color mode of the chart and updates the chart.
   */
  public toggleColourMode(): void {
    this.isColourModeDefault = !this.isColourModeDefault;
    this.createChart();
  }

  public toggleLegendAndColourMode(): void {
    this.isColourModeDefault = !this.isColourModeDefault;
    this.isLegendVisible = !this.isLegendVisible;
    this.createChart();
  }

  /**
   * Handles click events on the chart to retrieve and emit the relevant data.
   * Emits colour mode and graph data associated with dvcat clicked.
   * 
   * @param event - The click event containing information about the click position.
   */
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
            } as DvdecodData;
          });
        this.colourMode.emit(this.isColourModeDefault);
        this.dvdecodGraphData.emit(dvdecodData);
      }
    }
  }
}