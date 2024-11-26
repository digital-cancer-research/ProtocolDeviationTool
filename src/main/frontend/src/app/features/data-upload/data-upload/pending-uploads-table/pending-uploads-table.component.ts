import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pending-uploads-table',
  templateUrl: './pending-uploads-table.component.html',
  styleUrl: './pending-uploads-table.component.css'
})
export class PendingUploadsTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['name', 'type', 'size', 'actions'];
  @Input() data: File[] = [];
  dataSource = new MatTableDataSource<TableDataEntry>();

  ngOnInit(): void {
    this.dataSource.data = this.formatData(this.data);
  }

  /**
   * Lifecycle hook that is called when data-bound properties of a directive change.
   * Specifically, it updates the table data when the input 'data' changes.
   *
   * @param changes - An object containing all the change detection-checked properties
   *                  The keys are the names of the changed properties and the values
   *                  are SimpleChange instances.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    const dataChanges = changes['data'];
    if (dataChanges && !dataChanges.isFirstChange()) {
      this.data = dataChanges.currentValue;
      this.dataSource.data = this.formatData(this.data);
    }
  }


  /**
  * Formats an array of File objects into TableDataEntry objects for display in the table.
  * 
  * @param data - An array of File objects to be formatted.
  * @returns An array of TableDataEntry objects, each representing a row in the table.
  *          Each TableDataEntry includes file properties and an additional 'actions' field.
  */
  formatData(data: File[]): TableDataEntry[] {
    const tableData = data.map(file => {
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        actions: true
      } as TableDataEntry;
    })
    return tableData;
  }
}

interface TableDataEntry extends File {
  actions: boolean;
}