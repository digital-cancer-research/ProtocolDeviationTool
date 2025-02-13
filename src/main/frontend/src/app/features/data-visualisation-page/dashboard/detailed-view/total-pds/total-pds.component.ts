import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudyDataService } from 'src/app/shared/study-data-table/study-data.service';
import { DvdecodData } from '../../../models/team-pd-dvdecod-bar-graph-data.model';
import { map, Observable } from 'rxjs';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DataTableService } from 'src/app/shared/table/data-table/data-table.service';
import { ActivatedRoute } from '@angular/router';
import { DetailedViewComponent } from '../detailed-view.component';
import { TeamService } from 'src/app/core/new/services/team.service';
import { Team } from 'src/app/core/new/services/models/team/team.model';

@Component({
  selector: 'app-total-pds',
  templateUrl: './total-pds.component.html',
  styleUrl: './total-pds.component.css'
})
export class TotalPdsComponent {
  public static readonly URL = "total-pds";
  /** Snackbar to display visual feedback */
  private _snackBar = inject(MatSnackBar);
  duration = 5000;

  /** Displays snackbar */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.duration
    });
  }

  private readonly dvdecodGraphId: string = '#dvdecodGraph'

  private readonly tableClass: string = '.table'

  apiRequest: Observable<DataTableEntry[]> = new Observable();

  /** Array holding dvdecod data for the graph. */
  graphData: DvdecodData[] = [];

  /** Indicates whether the default color mode is active. */
  isColourModeDefault: boolean = true;

  /** The selected dvdecod from dvdecod-bar-graph. */
  selectedDvdecod: string = "";

  /** The user's selected team. */
  selectedTeam: Team | null = null;

  tableData: DataTableEntry[] = [];

  studyId?: string;

  hasStudyChanged: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private studyDataService: StudyDataService,
    private teamService: TeamService,
    private dataTableService: DataTableService,
    private route: ActivatedRoute
  ) {
    teamService.currentTeam$.subscribe(team => this.selectedTeam = team);
    route.queryParams.subscribe(() => {
      this.hasStudyChanged = true;
    });
  }

  /**
   * Upadates the colour mode for the graph.
   * 
   * @param isColourModeDefault - Boolean indicating whether the default color mode is active.
   */
  updateColourMode(isColourModeDefault: boolean): void {
    this.isColourModeDefault = isColourModeDefault;
  }

  /**
   * Updates the dvdecod graph data and triggers a smooth scroll to the graph.
   * Sets selectedDvdecod to "" to unrender table component
   * 
   * @param newData - Array of dvdecod data to be set.
   */
  updateDvdecodGraphData(newData: DvdecodData[]): void {
    this.hasStudyChanged = false;
    this.graphData = newData;
    this.selectedDvdecod = "";
    this.scroll(this.dvdecodGraphId);
  }

  /** 
   * Updates the selected dvdecod and api request for the table.
   * Triggers a smooth scroll to table component.
   * 
   * @param dvdecod 
   */
  updateTable(dvdecod: string): void {
    this.hasStudyChanged = false;
    this.selectedDvdecod = dvdecod;
    if (this.selectedTeam) {
      this.apiRequest = this.dataTableService.getDataByTeamId$(this.selectedTeam.id)
        .pipe(
          map((data) => data.filter(entry => entry.dvdecod.includes(dvdecod))),
          map((data) => data.filter(entry => DetailedViewComponent.studyId ? entry.studyId === DetailedViewComponent.studyId : true))
        );
      this.apiRequest
        .subscribe(
          {
            next: (data) => {
              this.tableData = data;
              this.scroll(this.tableClass);
            },
            error: (error) => {
              this.openSnackBar(`There was an error loading the data. ${error}`, "");
            }
          });
    }
  }

  /**
   * Scrolls smoothly to element found in query.
   * 
   * @param targetId Id or class of element
   * Scrolls to first element found
  */
  private scroll(targetId: string): void {
    this.cdr.detectChanges();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }
}