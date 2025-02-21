import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UploadedFile } from '../models/uploaded-file.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../file.service';
import { UserService } from 'src/app/core/new/services/user.service';
import { mergeMap, of } from 'rxjs';

/**
 * Component for displaying a table of uploaded files.
 */
@Component({
  selector: 'app-uploaded-files-table',
  templateUrl: './uploaded-files-table.component.html',
  styleUrl: './uploaded-files-table.component.css'
})
export class UploadedFilesTableComponent implements AfterViewInit {
  private fileService = inject(FileService);
  private userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['fileName', 'username', 'dateTimeUploaded', 'isFileBeingDeleted'];
  dataSource: MatTableDataSource<TableDataEntry> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Initialises the component and sets the data source.
   */
  constructor() {
    this.setDataSource();
  }

  /**
   * Sets the data source for the table.
   */
  setDataSource(): void {
    this.fileService.getFiles$().subscribe((files) => {
      this.dataSource.data = this.formatFiles(files);
    });
  }


  /**
   * Called after the view has been initialised.
   * Sets the paginator and sort for the data source.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Formats the files for display in the table.
   * 
   * @param files - The array of uploaded files.
   * @returns The formatted table data entries.
   */
  formatFiles(files: UploadedFile[]): TableDataEntry[] {
    return files.map((file) => ({
      ...file,
      actions: true,
      isFileBeingDeleted: false
    }));
  }

  /**
   * Applies a filter to the table data.
   * 
   * @param event - The filter event.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Handles the deletion of a file.
   * 
   * @param file - The file to delete.
   */
  onDelete(file: TableDataEntry) {
    file.isFileBeingDeleted = true;
    this.userService.currentUser$.pipe(
      mergeMap(user => {
        if (user !== null) {
          return this.fileService.deleteFile$({
            adminId: user.id,
            fileId: file.id
          });
        } else {
          this.openSnackbar(`You must be logged in to delete files`);
          return of(null);
        }
      })
    ).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((f) => f.id !== file.id);
        this.openSnackbar(`${file.fileName} deleted successfully`);
      },
      error: (error) => {
        this.openSnackbar(`Error deleting ${file.fileName}. ${error.message}`);
        file.isFileBeingDeleted = false;
      }
    });
  }

  /**
   * Opens a snackbar with the given message.
   * 
   * @param message - The message to display.
   */
  openSnackbar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 5000 });
  }
}

/**
 * Represents an entry in the uploaded files table.
 * @interface TableDataEntry
 * @extends {UploadedFile}
 */
interface TableDataEntry extends UploadedFile {
  actions: boolean;
  isFileBeingDeleted: boolean;
}