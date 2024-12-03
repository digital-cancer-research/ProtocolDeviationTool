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
  displayedColumns: string[] = ['fileName', 'username', 'dateTimeUploaded', 'actions'];
  dataSource: MatTableDataSource<TableDataEntry> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.setDataSource();
  }

  setDataSource(): void {
    this.fileListService.getUploadedFiles().subscribe((files) => {
      this.dataSource.data = this.formatFiles(files);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  formatFiles(files: UploadedFile[]): TableDataEntry[] {
    return files.map((file) => ({
      ...file,
      dateTimeUploaded: new Date(file.dateTimeUploaded),
      actions: true
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(file: TableDataEntry) {
    console.log(file);
    this.fileListService.deleteFile(file.fileId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((f) => f.fileId !== file.fileId);
        this.openSnackbar(`${file.fileName} deleted successfully`);
      },
      error: (error) => {
        this.openSnackbar(`Error deleting ${file.fileName}`);
      }
    });
  }

  openSnackbar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 5000 });
  }
}

interface TableDataEntry extends Omit<UploadedFile, 'dateTimeUploaded'> {
  actions: boolean;
  dateTimeUploaded: Date;
}