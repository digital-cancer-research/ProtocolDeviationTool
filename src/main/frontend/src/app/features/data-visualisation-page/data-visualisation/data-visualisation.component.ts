import { AfterViewInit, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Team } from 'src/app/core/models/team.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-data-visualisation',
  templateUrl: './data-visualisation.component.html',
  styleUrl: './data-visualisation.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DataVisualisationComponent implements AfterViewInit {
  tiles: Tile[] = [];
  cols: number = 0;
  rowHeight: string = '';
  
  get LAYOUT_LARGE(): Tile[] {
    this.cols = 6
    this.rowHeight = '50%'
    return [
      { colspan: 1, rowspan: 2 },
      { colspan: 1, rowspan: 1 },
      { colspan: 4, rowspan: 1 },
      { colspan: 2, rowspan: 1 },
      { colspan: 3, rowspan: 1 },
    ];
  }

  get LAYOUT_MEDIUM(): Tile[] {
    this.cols = 4
    this.rowHeight = '20%'
    return [
      { colspan: 4, rowspan: 1 },
      { colspan: 2, rowspan: 2 },
      { colspan: 2, rowspan: 2 },
      { colspan: 2, rowspan: 2 },
      { colspan: 2, rowspan: 2 },
    ];
  }

  get LAYOUT_SMALL(): Tile[] {
    this.cols = 1;
    this.rowHeight = '11%';
    return [
      { colspan: 1, rowspan: 1 },
      { colspan: 1, rowspan: 2 },
      { colspan: 1, rowspan: 2 },
      { colspan: 1, rowspan: 2 },
      { colspan: 1, rowspan: 2 },
    ];
  }

  ngAfterViewInit(): void {
    this.onResize();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    if (width > 1366) {
      this.tiles = this.LAYOUT_LARGE;
    } else if (width > 1024) {
      this.tiles = this.LAYOUT_MEDIUM;
    } else {
      this.tiles = this.LAYOUT_SMALL;
    }

    if (height < 768 ) {
      this.tiles = this.LAYOUT_SMALL;
    }
  }

  getVisualisationClass(index: number): string {
    switch(index) {
      case (0):
        return "select";
      case (1):
        return "count";
      case (2):
        return "barGraph";
      case (3):
        return "pieChart";
      case (4):
        return "studyBarGraph";
      default:
        return "";
    }
  }
}



export interface Tile {
  colspan: number;
  rowspan: number;
}