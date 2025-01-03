import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UploadedFile } from '../models/uploaded-file.model';
import { FileListService } from '../file-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-uploaded-files-table',
  templateUrl: './uploaded-files-table.component.html',
  styleUrl: './uploaded-files-table.component.css'
})
export class UploadedFilesTableComponent implements AfterViewInit {
  private fileListService = inject(FileListService);
  private _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['fileName', 'username', 'dateTimeUploaded', 'isFileBeingDeleted'];
  dataSource: MatTableDataSource<TableDataEntry> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.setDataSource();
  }

  /**
   * Fetches uploaded files and sets them as the data source for the table.
   * 
   * This function calls the fileListService to retrieve the list of uploaded files,
   * then formats these files and assigns them to the dataSource of the table.
   * It uses the Observable pattern to handle the asynchronous nature of the file retrieval.
   * 
   * @returns {void} This function doesn't return a value, but it updates the dataSource property.
   */
  setDataSource(): void {
    this.fileListService.getUploadedFiles().subscribe((files) => {
      this.dataSource.data = this.formatFiles(files);
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Formats an array of UploadedFile objects into TableDataEntry objects.
   * This function converts the dateTimeUploaded string to a Date object and adds an isFileBeingDeleted flag.
   *
   * @param files - An array of UploadedFile objects to be formatted.
   * @returns An array of TableDataEntry objects, each representing a formatted file entry for the table.
   */
  formatFiles(files: UploadedFile[]): TableDataEntry[] {
    return files.map((file) => ({
      ...file,
      dateTimeUploaded: new Date(file.dateTimeUploaded),
      isFileBeingDeleted: false,
    }));
  }


  /**
   * Applies a filter to the table's data source based on user input.
   * This function is typically triggered by a filter input field in the UI.
   * 
   * @param event - The event object from the input field.
   *                It should be an Event object, typically a keyboard event.
   * 
   * @returns void This function doesn't return a value, but it performs the following actions:
   *          - Extracts the filter value from the event target.
   *          - Trims and converts the filter value to lowercase.
   *          - Applies the filter to the dataSource.
   *          - If a paginator exists, it resets the view to the first page.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /**
   * Initiates the deletion process for a file and updates the UI accordingly.
   * 
   * @param file - The TableDataEntry object representing the file to be deleted.
   *               It contains information such as fileId, fileName, and other properties.
   * 
   * @returns void This function doesn't return a value, but it performs the following actions:
   *          - Sets the isFileBeingDeleted flag to true for the given file.
   *          - Calls the deleteFile method from fileListService.
   *          - On successful deletion, removes the file from the dataSource and shows a success message.
   *          - On error, shows an error message and resets the isFileBeingDeleted flag.
   */
  onDelete(file: TableDataEntry) {
    file.isFileBeingDeleted = true;
    this.fileListService.deleteFile(file.fileId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((f) => f.fileId !== file.fileId);
        this.openSnackbar(`${file.fileName} deleted successfully`);
      },
      error: (error) => {
        this.openSnackbar(`Error deleting ${file.fileName}`);
        file.isFileBeingDeleted = false;
      }
    });
  }


  openSnackbar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 5000 });
  }
}

/**
 * Represents an entry in the uploaded files table.
 * Changes the type of 'dateTimeUploaed' from string to Date - enables correct sorting in the table.
 * Adds attribute `isFileUploaded` to track if the file is currently being deleted.
 * @interface TableDataEntry
 * @extends {Omit<UploadedFile, 'dateTimeUploaded'>}
 */
interface TableDataEntry extends Omit<UploadedFile, 'dateTimeUploaded'> {
  dateTimeUploaded: Date;
  isFileBeingDeleted: boolean;
}