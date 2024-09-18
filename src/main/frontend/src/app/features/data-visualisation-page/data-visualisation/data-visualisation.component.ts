import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-visualisation',
  templateUrl: './data-visualisation.component.html',
  styleUrl: './data-visualisation.component.css'
})
export class DataVisualisationComponent implements AfterViewInit {
  tiles: Tile[] = [
    { text: 'One', colspan: 3, rowspan: 1 },
    { text: 'Two', colspan: 1, rowspan: 2 },
    { text: 'Three', colspan: 1, rowspan: 1 },
    { text: 'Four', colspan: 2, rowspan: 1 },
  ];
  cols: number = 6
  rowHeight: string = '50%'

  get LAYOUT_LARGE(): Tile[] {
    this.cols = 5
    this.rowHeight = '50%'
    return [
      { text: 'One', colspan: 1, rowspan: 2 },
      { text: 'Two', colspan: 2, rowspan: 1 },
      { text: 'Three', colspan: 2, rowspan: 1 },
      { text: 'Four', colspan: 2, rowspan: 1 },
      { text: 'Five', colspan: 2, rowspan: 1 },
    ];
  }

  get LAYOUT_MEDIUM(): Tile[] {
    this.cols = 4
    this.rowHeight = '20%'
    return [
      { text: 'One', colspan: 4, rowspan: 1 },
      { text: 'Two', colspan: 2, rowspan: 2 },
      { text: 'Three', colspan: 2, rowspan: 2 },
      { text: 'Four', colspan: 2, rowspan: 2 },
      { text: 'Five', colspan: 2, rowspan: 2 },
    ];
  }

  get LAYOUT_SMALL(): Tile[] {
    this.cols = 1;
    this.rowHeight = '11%';
    return [
      { text: 'One', colspan: 1, rowspan: 1 },
      { text: 'Two', colspan: 1, rowspan: 2 },
      { text: 'Three', colspan: 1, rowspan: 2 },
      { text: 'Four', colspan: 1, rowspan: 2 },
      { text: 'Five', colspan: 1, rowspan: 2 },
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
}



export interface Tile {
  colspan: number;
  rowspan: number;
  text?: string;
}