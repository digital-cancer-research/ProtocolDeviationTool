import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { dvdecodData } from '../models/team-pd-dvdecod-bar-graph-data.model';
import { StudyDataService } from 'src/app/shared/study-data-table/study-data.service';
import { UserService } from 'src/app/core/services/user.service';
import { Team } from 'src/app/core/models/team.model';
import { StudyData } from 'src/app/shared/study-data-table/study-data';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * TeamLevelDashboardComponent manages the display and behavior of
 * the team-level dashboard, including color mode and dvdecod data visualization.
 */
@Component({
  selector: 'app-team-level-dashboard',
  templateUrl: './team-level-dashboard.component.html',
  styleUrls: ['./team-level-dashboard.component.css']
})
export class TeamLevelDashboardComponent {

  /** Snackbar to display visual feedback */
  private _snackBar = inject(MatSnackBar);
  duration = 5000;

  /** Displays snackbar */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.duration
    });
  }

  private static readonly dvdecodGraphId: string = '#dvdecodGraph'

  private static readonly tableClass: string = '.table'

  /** Array holding dvdecod data for the graph. */
  graphData: dvdecodData[] = [];

  /** Indicates whether the default color mode is active. */
  isColourModeDefault: boolean = true;

  /** The selected dvdecod from dvdecod-bar-graph. */
  selectedDvdecod: string = "";

  /** The user's selected team. */
  selectedTeam: Team | null = null;

  tableData: StudyData[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private studyDataService: StudyDataService,
    private userService: UserService
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
  updateDvdecodGraphData(newData: dvdecodData[]): void {
    this.graphData = newData;
    this.selectedDvdecod = "";
    this.scroll(TeamLevelDashboardComponent.dvdecodGraphId);
  }

  /** 
   * Sets the selected dvdecod.
   * Triggers a smooth scroll to table component.
   * 
   * @param dvdecod 
   */
  updateSelectedDvdecod(dvdecod: string): void {
    console.log("this.selectedTeam");
    console.log(this.selectedTeam);
    if (this.selectedTeam) {
      this.studyDataService.getDataByTeamId$(this.selectedTeam.teamId)
      .subscribe(
        {
          next: (data) => {
            this.selectedDvdecod = dvdecod;
            console.log('data');
            console.log(data);
            this.tableData = data
            .filter(dataEntry => dataEntry.dvdecod === this.selectedDvdecod);
            this.scroll(TeamLevelDashboardComponent.tableClass);
            console.log('this.tableData');
            console.log(this.tableData);
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
