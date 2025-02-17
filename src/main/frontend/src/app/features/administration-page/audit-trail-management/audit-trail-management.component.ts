import { Component, inject, ViewChild } from '@angular/core';
import { AuditTrailManagementService } from './audit-trail-management.service';
import { AuditTrailData } from '../models/audit-trail-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-audit-trail-management',
  templateUrl: './audit-trail-management.component.html',
  styleUrls: ['./audit-trail-management.component.css']
})
export class AuditTrailManagementComponent {
  private readonly auditTrailService = inject(AuditTrailManagementService);
  private _snackbar = inject(MatSnackBar);

  protected displayedColumns: string[] = [
    'username',
    'date',
    'action',
    'originalValue',
    'newValue'
  ];

  protected dataSource: MatTableDataSource<AuditTrailData> = new MatTableDataSource();

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;


  constructor() {
    this.fetchAuditTrailData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Fetches audit trail data from the server and updates the data source.
   * 
   * This method calls the audit trail service to retrieve data, formats it,
   * and updates the component's data source. If an error occurs during the
   * fetch operation, it displays an error message using a snackbar.
   * 
   * @returns {void} This method doesn't return a value.
   */
  private fetchAuditTrailData(): void {
    this.auditTrailService.getAuditTrailData().subscribe(
      {
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => {
          this._snackbar.open(`Couldn't load audit trail data: ${error.message}`, "Dismiss", {
            duration: 5000
          });
        }
      }
    );
  }

  /**
   * Applies a filter to the data source based on user input.
   * 
   * This method is triggered when the user types into the filter input field.
   * It updates the data source's filter with the lowercase trimmed input value
   * and resets the paginator to the first page if it exists.
   * 
   * @param event - The input event from the filter field.
   *                Contains the user's input value.
   */
  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}