import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Team } from 'src/app/core/models/team.model';
import { StudyDataService } from 'src/app/shared/study-data-table/study-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { DvdecodData } from '../../../models/team-pd-dvdecod-bar-graph-data.model';
import { map, Observable } from 'rxjs';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DataTableService } from 'src/app/shared/table/data-table/data-table.service';

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

  constructor(
    private cdr: ChangeDetectorRef,
    private studyDataService: StudyDataService,
    private userService: UserService,
    private dataTableService: DataTableService
  ) {
    userService.currentUserSelectedTeam$.subscribe(team => this.selectedTeam = team);
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
    this.selectedDvdecod = dvdecod;
    if (this.selectedTeam) {
      this.apiRequest = this.dataTableService.getDataByTeamId$(this.selectedTeam.teamId)
        .pipe(
          map((data) => data.filter(entry => entry.dvdecod === dvdecod)
          )
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