import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudyData } from './study-data';

/**
 * Component for displaying study data in a table format with pagination, filtering and sorting features.
 */
@Component({
  selector: 'app-study-data-table',
  templateUrl: './study-data-table.component.html',
  styleUrl: './study-data-table.component.css'
})
export class StudyDataTableComponent implements AfterViewInit, OnChanges {

  /** Columns to be displayed in the table. */
  displayedColumns: string[] = ['studyId', 'dvspondes', 'dvcat', 'dvdecod'];

  /** Data source for the table. */
  dataSource: MatTableDataSource<StudyData>;

  /** Input data for the table. Assumed to be filtered by the dvdecod prehand. */
  @Input() data: StudyData[] = [];

  /** Input for the dvdecod. */
  @Input({ required: true }) dvdecod: string = "";

  /** Reference to the paginator for managing pagination in the table. */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Reference to the sort for enabling sorting in the table. */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Creates an instance of StudyDataTableComponent and initialises the data source.
   */
  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  /**
   * Responds to changes in input properties and updates the data source.
   */
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  /**
   * Applies a filter to the data source based on the user's input.
   * 
   * @param event - The event triggered by the input change, typically from a filter input field.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}