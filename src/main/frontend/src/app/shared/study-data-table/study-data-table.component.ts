import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StudyData } from './study-data';
import { StudyDataService } from './study-data.service';

@Component({
  selector: 'app-study-data-table',
  templateUrl: './study-data-table.component.html',
  styleUrl: './study-data-table.component.css'
})
export class StudyDataTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['studyId', 'dvspondes', 'dvcat', 'dvdecod'];
  dataSource: MatTableDataSource<StudyData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    studyDataService: StudyDataService
  ) {
    const data = studyDataService.getData(); 
    this.dataSource = new MatTableDataSource(data);
  }

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
}