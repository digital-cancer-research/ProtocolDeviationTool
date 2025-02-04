import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { UploadError } from '../models/upload-error.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * Component for displaying a table of upload errors.
 */
@Component({
  selector: 'app-upload-errors-table',
  templateUrl: './upload-errors-table.component.html',
  styleUrl: './upload-errors-table.component.css'
})
export class UploadErrorsTableComponent implements AfterViewInit, OnChanges {
  protected displayedColumns: string[] = ['index', 'filename', 'message', 'actions'];
  private idCounter = 0;
  @Input() newErrors: UploadError[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<TableDataEntry> = new MatTableDataSource(
    this.formatData(this.newErrors)
  );

  /**
   * Lifecycle hook that is called after Angular has fully initialised the component's view.
   * It sets up the paginator and sort functionality for the data table.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Applies a filter to the data source based on user input.
   * This function updates the filter of the data source with the input value,
   * converts it to lowercase, and trims any whitespace.
   * If a paginator is present, it also resets the view to the first page.
   *
   * @param event - The event object from the input element.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Lifecycle hook that is called when data-bound properties of a directive change.
   * Specifically, it updates the table data when the input 'newErrors' changes.
   *
   * @param changes - An object containing all the change detection-checked properties
   *                  The keys are the names of the changed properties and the values
   *                  are SimpleChange instances.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const errorChanges = changes['newErrors'];
    if (errorChanges && !errorChanges.firstChange) {
      this.newErrors = errorChanges.currentValue;
      this.dataSource.data = [...this.dataSource.data, ...this.formatData(this.newErrors)];
    }
  }

  /**
   * Formats an array of UploadError objects into TableDataEntry objects for display in the table.
   *
   * @param errors - An array of UploadError objects to be formatted.
   * @returns An array of TableDataEntry objects, each representing a row in the table.
   */
  formatData(errors: UploadError[]): TableDataEntry[] {
    return errors.map(error => (
      { 
        ...error,
        entry: error.entry.filter(field => field.trim() !== ''),
        id: this.idCounter++,
        actions: true }));
  }

  /**
   * Deletes an error entry from the upload errors table.
   *
   * @param entry - The TableDataEntry object representing the error entry to be deleted.
   */
  onDelete(entry: TableDataEntry): void {
    this.dataSource.data = this.dataSource.data.filter(de => de.id !== entry.id);
  }
}

/**
 * Interface representing a table data entry.
 */
interface TableDataEntry extends UploadError {
  actions: boolean;
  id: number;
}