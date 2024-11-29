import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UploadResponse } from 'src/app/shared/upload/upload-response.model';
import { UploadService } from 'src/app/shared/upload/upload.service';
import { UploadError } from '../models/upload-error.model';

@Component({
  selector: 'app-pending-uploads-table',
  templateUrl: './pending-uploads-table.component.html',
  styleUrl: './pending-uploads-table.component.css'
})
export class PendingUploadsTableComponent implements OnInit, OnChanges {
  private uploadService = inject(UploadService);
  private userService = inject(UserService);
  private currentUser: User | null = null;
  private snackbar = inject(MatSnackBar);
  // Supports 'type' column -  just add to array.
  displayedColumns: string[] = ['name', 'size', 'actions'];
  @Input() data: File[] = [];
  @Output() errors: EventEmitter<string> = new EventEmitter();
  dataSource = new MatTableDataSource<TableDataEntry>();


  constructor() {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.dataSource.data = this.formatData(this.data);
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
    const dataChanges = changes['data'];
    if (dataChanges && !dataChanges.isFirstChange()) {
      this.data = dataChanges.currentValue;
      this.dataSource.data = this.formatData(this.data);
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
  onUpload(data: TableDataEntry, index: number): void {
    data.inProgress = true;
    if (!this.currentUser) {
      const noUserErrorMessage = "You must be logged in to upload. Please login and try again.";
      console.error(noUserErrorMessage);
      this.openSnackbar(noUserErrorMessage, "Dismiss");
      data.inProgress = false;
      return;
    }

    const upload = this.uploadService.uploadFile(data.file, this.currentUser).subscribe(
      {
        next: (response) => {
          this.openSnackbar(response.message, "Dismiss");
          if (!response.message.includes("file uploaded.")) {
            this.errors.emit(`${data.file.name}: ${response.message}`);
          } else {
            this.removeItemFromDataSource(index);
          }
        },
        error: (error) => {
          this.openSnackbar(error.message, "Dismiss");
          console.error('Error uploading file:', error);
          data.inProgress = false;
        }
      }
    );
    data.upload = upload;
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
  onDelete(index: number): void {
    this.removeItemFromDataSource(index);
  }

  removeItemFromDataSource(index: number): void {
    const tempData = this.dataSource.data;
    tempData.splice(index, 1);
    this.dataSource.data = tempData;
  }

  openSnackbar(message: string, actions: string) {
    this.snackbar.open(message, actions, {
      duration: 5000,
    });
  }

}

interface TableDataEntry {
  file: File;
  actions: boolean;
  inProgress: boolean;
  upload: Subscription
}