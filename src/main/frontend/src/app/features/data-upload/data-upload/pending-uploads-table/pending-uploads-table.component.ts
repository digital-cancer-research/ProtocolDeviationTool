import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UploadService } from 'src/app/shared/upload/upload.service';

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
  displayedColumns: string[] = ['name', 'type', 'size', 'actions'];
  @Input() data: File[] = [];
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

  onUpload(data: TableDataEntry, index: number): void {
    data.inProgress = true;
    if (!this.currentUser) {
      console.error("You must be logged in to upload");
      data.inProgress = false;
      return;
    }

    const upload = this.uploadService.uploadFile(data.file, this.currentUser).subscribe(
      {
        next: (response) => {
          this.removeItemFromDataSource(index);
          this.openSnackbar(response.message, "Dismiss");
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

  onCancel(data: TableDataEntry): void {
      data.upload.unsubscribe();
      data.inProgress = false;
  }

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