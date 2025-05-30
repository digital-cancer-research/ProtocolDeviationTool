import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tiles: Tile[] = [];
  cols: number = 0;
  rowHeight: string = '';

  get LAYOUT_LARGE(): Tile[] {
    this.cols = 6
    this.rowHeight = '50%'
    return [
      { colspan: 1, rowspan: 2, order: 0 },
      { colspan: 1, rowspan: 1, order: 1 },
      { colspan: 4, rowspan: 1, order: 2 },
      { colspan: 2, rowspan: 1, order: 3 },
      { colspan: 3, rowspan: 1, order: 4 },
    ];
  }

  get LAYOUT_MEDIUM(): Tile[] {
    this.cols = 5
    this.rowHeight = `${100/10}%`
    return [
      { colspan: 1, rowspan: 2, order: 0 },
      { colspan: 4, rowspan: 5, order: 2 },
      { colspan: 1, rowspan: 3, order: 1 },
      { colspan: 2, rowspan: 5, order: 3 },
      { colspan: 3, rowspan: 5, order: 4 },
    ];
  }

  get LAYOUT_SMALL(): Tile[] {
    this.cols = 1;
    this.rowHeight = '10%';
    return [
      { colspan: 1, rowspan: 1, order: 0 },
      { colspan: 1, rowspan: 1, order: 1 },
      { colspan: 1, rowspan: 3, order: 2 },
      { colspan: 1, rowspan: 2, order: 3 },
      { colspan: 1, rowspan: 3, order: 4 },
    ];
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    if (width > 1400) {
      this.tiles = this.LAYOUT_LARGE;
    } else if (width > 650) {
      this.tiles = this.LAYOUT_MEDIUM;
    } else {
      this.tiles = this.LAYOUT_SMALL;
    }
  }

  getVisualisationFromOrder(index: number): string {
    switch (index) {
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

  trackByOrder(tile: Tile): number {
    return tile.order;
  }
}

export interface Tile {
  colspan: number;
  rowspan: number;
  order: number;
}