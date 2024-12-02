import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UploadError } from '../models/upload-error.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-upload-errors-table',
  templateUrl: './upload-errors-table.component.html',
  styleUrl: './upload-errors-table.component.css'
})
export class UploadErrorsTableComponent implements OnChanges {
  protected displayedColumns: string[] = ['filename', 'message'];
  @Input() errors: UploadError[] = [];
  dataSource: MatTableDataSource<UploadError> = new MatTableDataSource(this.errors);

  ngOnChanges(changes: SimpleChanges): void {
    const errorChanges = changes['errors'];
    console.log("Changes");
    if (errorChanges && !errorChanges.firstChange) {
      this.errors = errorChanges.currentValue;
      this.dataSource.data = this.errors;
    }
  }
}
