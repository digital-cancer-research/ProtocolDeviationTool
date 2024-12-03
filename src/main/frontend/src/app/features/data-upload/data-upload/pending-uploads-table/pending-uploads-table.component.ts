import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UploadResponse } from 'src/app/shared/upload/upload-response.model';
import { UploadService } from 'src/app/shared/upload/upload.service';
import { UploadError } from '../models/upload-error.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pending-uploads-table',
  templateUrl: './pending-uploads-table.component.html',
  styleUrl: './pending-uploads-table.component.css'
})
export class PendingUploadsTableComponent implements OnInit, OnChanges, AfterViewInit {
  private uploadService = inject(UploadService);
  private userService = inject(UserService);
  private currentUser: User | null = null;
  private snackbar = inject(MatSnackBar);
  private idCounter = 0;
  // Supports 'type' column -  just add to array.
  displayedColumns: string[] = ['name', 'size', 'actions'];
  @Input() newData: File[] = [];
  @Output() errors: EventEmitter<UploadError> = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<TableDataEntry>();


  constructor() {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.dataSource.data = this.formatData(this.newData);
    this.setFilter();
  }

  /**
   * Lifecycle hook that is called when data-bound properties of a directive change.
   * Specifically, it updates the table data when the input 'data' changes.
   *
   * @param changes - An object containing all the change detection-checked properties
   *                  The keys are the names of the changed properties and the values
   *                  are SimpleChange instances.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    const dataChanges = changes['newData'];
    if (dataChanges && !dataChanges.isFirstChange()) {
      this.newData = dataChanges.currentValue;
      this.dataSource.data = [...this.dataSource.data, ...this.formatData(this.newData)];
    }
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized the component's view.
   * It sets up the paginator, custom sorting accessor, and sort functionality for the data table.
   *
   * This method performs the following tasks:
   * 1. Assigns the paginator to the data source for pagination functionality.
   * 2. Defines a custom sorting accessor to handle nested properties in the data structure.
   * 3. Assigns the sort directive to the data source for sorting functionality.
   *
   * The custom sorting accessor allows sorting on both top-level properties of TableDataEntry
   * and nested properties within the 'file' object.
   *
   * @returns {void}
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      const value = property in item.file ? item.file[property as keyof File] : item[property as keyof TableDataEntry];
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
      return '';
    };
    this.dataSource.sort = this.sort;
  }


  /**
   * Sets up a custom filter predicate for the data source.
   * This function configures how filtering is applied to the table data.
   * This is due to the nested File object in the entries.
   * 
   * The filter checks if the file name, type, or size (in KB) includes the filter value.
   * The comparison is case-insensitive.
   * 
   * @returns {void}
   */
  setFilter() {
    this.dataSource.filterPredicate = (data: TableDataEntry, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.file.name.toLowerCase().includes(filterValue) ||
        data.file.type.toLowerCase().includes(filterValue) ||
        (data.file.size / 1024).toFixed(2).includes(filterValue)
      );
    };
  }


  /**
   * Applies a filter to the data source based on user input.
   * This function updates the filter of the data source with the input value,
   * converts it to lowercase, and trims any whitespace.
   * If a paginator is present, it also resets the view to the first page.
   *
   * @param event - The event object from the input element.
   *                This is typically a 'change' or 'input' event.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /**
  * Formats an array of File objects into TableDataEntry objects for display in the table.
  * 
  * @param data - An array of File objects to be formatted.
  * @returns An array of TableDataEntry objects, each representing a row in the table.
  *          Each TableDataEntry includes file properties and an additional 'actions' field.
  */
  formatData(data: File[]): TableDataEntry[] {
    const tableData = data.map(file => {
      return {
        id: this.idCounter++,
        file: file,
        actions: true,
        inProgress: false,
      } as TableDataEntry;
    })
    return tableData;
  }

  /**
   * Initiates the file upload process for a specific table entry.
   * This method handles the upload process, including user authentication checks,
   * progress indication, and error handling.
   *
   * @param data - The TableDataEntry object representing the file to be uploaded.
   * @param index - The index of the file in the data source array.
   * @returns void
   *
   * @throws Will display an error message if the user is not logged in.
   * @emits errors - Emits an error message if the upload response indicates a problem.
   */
  onUpload(entry: TableDataEntry): void {
    entry.inProgress = true;
    if (!this.currentUser) {
      const noUserErrorMessage = "You must be logged in to upload files. Please login and try again.";
      console.error(noUserErrorMessage);
      this.openSnackbar(noUserErrorMessage, "Dismiss");
      entry.inProgress = false;
      return;
    }

    const upload = this.uploadService.uploadFile(entry.file, this.currentUser).subscribe(
      {
        next: (response) => {
          this.openSnackbar(response.message, "Dismiss");
          if (!response.message.includes("file uploaded.")) {
            const error = {
              filename: entry.file.name,
              message: response.message
            };
            this.errors.emit(error);
          }
          this.onDelete(entry);
        },
        error: (error) => {
          this.openSnackbar(error.message, "Dismiss");
          console.error('Error uploading file:', error);
          entry.inProgress = false;
        }
      }
    );
    entry.upload = upload;
  }

  /**
   * Cancels an ongoing file upload operation.
   * 
   * This function unsubscribes from the upload subscription and resets the progress state.
   * It should be called when the user wants to cancel an in-progress upload.
   *
   * @param data - The TableDataEntry object representing the file upload to be cancelled.
   *               This object contains the upload subscription and progress state.
   * 
   * @returns void
   */
  onCancel(data: TableDataEntry): void {
    data.upload.unsubscribe();
    data.inProgress = false;
  }

  /**
   * Deletes a file entry from the pending uploads table.
   * 
   * This function removes a specific file entry from the data source
   * of the pending uploads table based on its index.
   *
   * @param index - The index of the file entry to be deleted from the data source.
   * @returns void This function does not return a value.
   */
  onDelete(entry: TableDataEntry): void {
    this.dataSource.data = this.dataSource.data.filter(de => de.id !== entry.id);
  }

  /**
   * Opens a snackbar to display a message to the user.
   * 
   * @param message - The text message to be displayed in the snackbar.
   * @param actions - The text for the action button in the snackbar.
   * @returns void This function does not return a value.
   */
  openSnackbar(message: string, actions: string) {
    this.snackbar.open(message, actions, {
      duration: 5000,
    });
  }

}

interface TableDataEntry {
  id: number;
  file: File;
  actions: boolean;
  inProgress: boolean;
  upload: Subscription
}