import { Component, inject } from '@angular/core';
import { DataTableEntry } from 'src/app/core/models/data/data-table-entry.model';
import { DataTableService } from 'src/app/shared/table/data-table/data-table.service';

@Component({
  selector: 'app-data-categorisation',
  templateUrl: './data-categorisation.component.html',
  styleUrl: './data-categorisation.component.css'
})
export class DataCategorisationComponent {
  private readonly dataTableService = inject(DataTableService);
  data: DataTableEntry[] = [];
  filteredData = this.data;

  constructor() {
    this.dataTableService.getData$().subscribe(data => { 
      this.data = data
      this.filteredData = data;
    });
  }

  updateData(fileIds: number[]) { 
    this.filteredData = this.filterData(fileIds);
  }

  filterData(fileIds: number[]): DataTableEntry[] {
    if (fileIds.length === 0) {
      return this.data;
    } else {
      return this.data.filter(entry => fileIds.includes(entry.fileId));
    }
  }
}
