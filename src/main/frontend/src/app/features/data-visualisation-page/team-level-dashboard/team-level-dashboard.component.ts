import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { dvdecodData } from '../models/team-pd-dvdecod-bar-graph-data.model';

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
  private static readonly dvdecodGraphId: string = '#dvdecodGraph'

  private static readonly tableClass: string = '.table'

  /** Array holding dvdecod data for the graph. */
  graphData: dvdecodData[] = [];

  /** Indicates whether the default color mode is active. */
  isColourModeDefault: boolean = true;

  /** The selected dvdecod from dvdecod-bar-graph*/
  selectedDvdecod: string = "";

  constructor(private cdr: ChangeDetectorRef) { }

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
    this.selectedDvdecod = dvdecod;
    this.scroll(TeamLevelDashboardComponent.tableClass);
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
