import { Component, OnInit } from '@angular/core';
import { AuditTrailManagementService } from './audit-trail-management.service';

@Component({
  selector: 'app-audit-trail-management',
  templateUrl: './audit-trail-management.component.html',
  styleUrls: ['./audit-trail-management.component.css']
})
export class AuditTrailManagementComponent implements OnInit {
  auditTrailData: any[] = [];
  pagedAuditTrail: any[] = [];

  // Pagination properties
  itemsPerPage: number = 7;
  currentPage: number = 1;
  disabledFirstButton: boolean = false;
  disabledPreviousButton: boolean = false;
  disabledNextButton: boolean = false;
  disabledLastButton: boolean = false;

  sortedColumn: string = 'dateTimeEdited'; // Default sorting column
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private auditTrailService: AuditTrailManagementService) {}

  ngOnInit(): void {
    this.getAuditTrailData();
  }

  getAuditTrailData(): void {
    this.auditTrailService.getAuditTrailData().subscribe(
      (data: any[]) => {
        this.auditTrailData = data;
        this.updatePage();
      },
      error => {
        console.error('Error fetching auditTrailData:', error);
      }
    );
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedAuditTrail = this.auditTrailData.slice(startIndex, startIndex + this.itemsPerPage);
    this.updateNavigationButtons();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  updateNavigationButtons(): void {
    this.disabledFirstButton = this.currentPage === 1;
    this.disabledPreviousButton = this.currentPage === 1;
    const totalPages = this.pages.length;
    this.disabledNextButton = this.currentPage === totalPages;
    this.disabledLastButton = this.currentPage === totalPages;
  }

  get pages(): number[] {
    return Array.from({ length: Math.ceil(this.auditTrailData.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  sortTable(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    // Sort the entire dataset
    this.auditTrailData.sort((a, b) => {
      const aValue = a[this.sortedColumn];
      const bValue = b[this.sortedColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });

    // Update pagination after sorting
    this.setPage(this.currentPage);
  }
}
