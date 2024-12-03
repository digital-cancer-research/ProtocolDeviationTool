import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { UploadError } from '../models/upload-error.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-upload-errors-table',
  templateUrl: './upload-errors-table.component.html',
  styleUrl: './upload-errors-table.component.css'
})
export class UploadErrorsTableComponent implements AfterViewInit, OnChanges {
  protected displayedColumns: string[] = ['filename', 'message', 'actions'];
  private idCounter = 0;
  @Input() errors: UploadError[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<TableDataEntry> = new MatTableDataSource(
    this.formatData(this.errors)
  );

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

  ngOnChanges(changes: SimpleChanges): void {
    const errorChanges = changes['errors'];
    if (errorChanges && !errorChanges.firstChange) {
      this.errors = errorChanges.currentValue;
      this.dataSource.data = this.formatData(this.errors);
    }
  }

  formatData(errors: UploadError[]): TableDataEntry[] {
    return errors.map(error => (
      { 
        ...error,
        id: this.idCounter++, 
        actions: true }));
  }

  onDelete(entry: TableDataEntry): void {
    this.dataSource.data = this.dataSource.data.filter(de => entry.id);
  }
}

interface TableDataEntry extends UploadError {
  id: number;
  actions: boolean;
}
