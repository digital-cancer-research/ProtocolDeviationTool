import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UploadError } from '../models/upload-error.model';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/core/new/services/user.service';
import { User } from 'src/app/core/new/services/models/user/user.model';
import { FileService } from '../file.service';
import { DEFAULT_AI_CONFIG } from '../models/ai-categorisation-config.model';
import { MatSort } from '@angular/material/sort';

/**
 * Component for managing the table of pending file uploads.
 */
@Component({
  selector: 'app-pending-uploads-table',
  templateUrl: './pending-uploads-table.component.html',
  styleUrl: './pending-uploads-table.component.css'
})
export class PendingUploadsTableComponent implements OnInit, OnChanges, AfterViewInit {
  private fileService = inject(FileService);
  private userService = inject(UserService);
  private currentUser: User | null = null;
  private snackbar = inject(MatSnackBar);
  private idCounter = 0;
  // Supports 'type' column -  just add to array.
  displayedColumns: string[] = ['name', 'size', 'actions'];
  @Input() newData: File[] = [];
  @Input() useAi: boolean = false;
  @Output() onSuccessfulUpload: EventEmitter<void> = new EventEmitter();
  @Output() errors: EventEmitter<UploadError[]> = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<TableDataEntry>();

  constructor() {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  /**
   * Lifecycle hook that is called after Angular has initialised all data-bound properties.
   */
  ngOnInit(): void {
    this.dataSource.data = this.formatData(this.newData);
    this.setFilter();
  }

  /**
   * Lifecycle hook that is called when data-bound properties of a directive change.
   * Specifically, it updates the table data when the input 'newData' changes.
   *
   * @param changes - An object containing all the change detection-checked properties
   *                  The keys are the names of the changed properties and the values
   *                  are SimpleChange instances.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const dataChanges = changes['newData'];
    if (dataChanges && !dataChanges.isFirstChange()) {
      this.newData = dataChanges.currentValue;
      this.dataSource.data = [...this.dataSource.data, ...this.formatData(this.newData)];
    }
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialised the component's view.
   * It sets up the paginator, custom sorting accessor, and sort functionality for the data table.
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
   * This method configures how filtering is applied to the table data,
   * specifically handling the nested File object in the TableDataEntry.
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
   * @param entry - The TableDataEntry object representing the file to be uploaded.
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

    const formData = new FormData();
    DEFAULT_AI_CONFIG.useAi = this.useAi;
    let aiConfig = JSON.stringify(DEFAULT_AI_CONFIG);
    formData.append('file', entry.file);
    formData.append('userId', this.currentUser.id.toString());
    formData.append('aiConfig', aiConfig);

    const upload = this.fileService.uploadFile$(formData).subscribe(
      {
        next: (response) => {
          let message = `${entry.file.name} successfully uploaded`;
          if (this.handleErrors(response, entry, true)) {
            message = message + ". One or more entries were not categorised because their categorisation was not valid. "
          }
          this.openSnackbar(message, "Dismiss");
          this.onSuccessfulUpload.emit();
          this.onDelete(entry);
        },
        error: (response) => {
          this.handleErrors(response, entry);
          const errorMessage = response.error.message ? response.error.message : "";
          const errorInfo = response.error.error ? response.error.error : "";
          this.openSnackbar(`${errorMessage}. ${errorInfo}`, "Dismiss");
          entry.inProgress = false;
        }
      }
    );
    entry.upload = upload;
  }

  /**
   * Handles errors during the file upload process.
   *
   * @param response - The response object containing error details.
   * @param entry - The TableDataEntry object representing the file being uploaded.
   * @param warnings - A boolean indicating if the errors are warnings.
   * @returns true if there are errors, false otherwise.
   */
  private handleErrors(response: any, entry: TableDataEntry, warnings: boolean = false): boolean {
    const data = warnings ? response?.warnings : response?.error?.subErrors;

    if (Array.isArray(data) && data.length > 0) {
        const subErrors: UploadError[] = data.map((error: { message: any; entry: any; index: any; }) => ({
            filename: entry.file.name,
            message: error.message,
            entry: error.entry,
            index: error.index,
        }));

        this.errors.emit(subErrors);
        return true;
    }

    return false;
  }

  /**
   * Cancels an ongoing file upload operation.
   * 
   * This function unsubscribes from the upload subscription and resets the progress state.
   * It should be called when the user wants to cancel an in-progress upload.
   *
   * @param entry - The TableDataEntry object representing the file upload to be cancelled.
   */
  onCancel(entry: TableDataEntry): void {
    entry.upload.unsubscribe();
    entry.inProgress = false;
  }

  /**
   * Deletes a file entry from the pending uploads table.
   * 
   * This function removes a specific file entry from the data source
   * of the pending uploads table based on its index.
   *
   * @param entry - The TableDataEntry object representing the file entry to be deleted.
   */
  onDelete(entry: TableDataEntry): void {
    this.dataSource.data = this.dataSource.data.filter(de => de.id !== entry.id);
  }

  /**
   * Opens a snackbar to display a message to the user.
   * 
   * @param message - The text message to be displayed in the snackbar.
   * @param actions - The text for the action button in the snackbar.
   */
  openSnackbar(message: string, actions: string) {
    this.snackbar.open(message, actions, {
      duration: 5000,
    });
  }

  isSomeFileInProgress() {
    return this.dataSource.data.some(entry => entry.inProgress);
  }

}

/**
 * Interface representing a table data entry.
 */
interface TableDataEntry {
  id: number;
  file: File;
  actions: boolean;
  inProgress: boolean;
  upload: Subscription;
}

