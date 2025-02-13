import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { DataTrailService } from './data-trail.service';
import { DataAudit } from '../models/data-audit.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data-trail',
  templateUrl: './data-trail.component.html',
  styleUrl: './data-trail.component.css'
})
export class DataTrailComponent implements AfterViewInit {
  private readonly dataTrailService = inject(DataTrailService);
  displayedColumns: string[] = ['date', 'username', 'studyId', 'dvspondes', 'originalData', 'modifiedData'];
  dataSource!: MatTableDataSource<DataAudit>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataTrailService.getDataAudit$().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
