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

  constructor() {
    this.dataTableService.getData$().subscribe(data => this.data = data);
  }
}
