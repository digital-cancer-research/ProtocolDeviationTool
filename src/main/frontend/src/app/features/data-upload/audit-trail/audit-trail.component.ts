import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileAudit } from '../data-upload/models/file-audit.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FileService } from '../data-upload/file-list.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.css'
})
export class AuditTrailComponent implements AfterViewInit {
  private fileService = inject(FileService);
  displayedColumns: string[] = ['fileName', 'username', 'fileStatus', 'date'];
  dataSource: MatTableDataSource<FileAudit> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.fileService.fileAudits$().subscribe(data => {
      this.dataSource.data = data.map(audit => ({
        ...audit,
        fileStatus: audit.fileStatus.replace("_", " ")
      }));
    })
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

}