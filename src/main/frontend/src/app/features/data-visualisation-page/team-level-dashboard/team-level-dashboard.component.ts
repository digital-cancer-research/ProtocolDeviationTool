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
  /** Strnig literal reference to canvas ID */
  private static readonly canvasId: string = 'dvdecodBarGraphCard';


  /** Array holding dvdecod data for the graph. */
  graphData: dvdecodData[] = [];

  /** Indicates whether the default color mode is active. */
  isColourModeDefault: boolean = true;

  /** Reference to the dvdecod bar graph card DOM element. */
  @ViewChild(TeamLevelDashboardComponent.canvasId) dvdecodBarGraphCard!: ElementRef;

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
   * 
   * @param newData - Array of dvdecod data to be set.
   */
  updateDvdecodGraphData(newData: dvdecodData[]): void {
    this.graphData = newData;
    this.cdr.detectChanges();
    this.scrollToGraph();
  }

  /**
   * Scrolls smoothly to the dvdecod graph card element.
   */
  private scrollToGraph(): void {
    const scrollElement = document.querySelector('.scroll');
    if (scrollElement) {
      scrollElement.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }
}
