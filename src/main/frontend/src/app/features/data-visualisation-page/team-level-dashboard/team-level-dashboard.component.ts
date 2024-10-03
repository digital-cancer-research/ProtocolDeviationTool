import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { dvdecodData } from '../models/team-pd-dvdecod-bar-graph-data.model';

@Component({
  selector: 'app-team-level-dashboard',
  templateUrl: './team-level-dashboard.component.html',
  styleUrl: './team-level-dashboard.component.css'
})
export class TeamLevelDashboardComponent {
  data: dvdecodData[] = [];
  isColourModeDefault: boolean = true;
  @ViewChild("dvdecodBarGraphCard") dvdecodBarGraphCard!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  setColourMode(isColourModeDefault: boolean) {
    this.isColourModeDefault = isColourModeDefault;
  }

  setDvdecodGraphData(data: dvdecodData[]) {
    this.data = data
    this.cdr.detectChanges();
    const el = document.getElementsByClassName("scroll")[0];
    el.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
}
