import { Component, ViewChild } from '@angular/core';
import { FileListComponent } from '../../../shared/file-list/file-list.component';
import { CategoryTableComponent } from 'src/app/shared/category-table/category-table.component';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrl: './data-upload.component.css'
})
export class DataUploadComponent {
  @ViewChild(FileListComponent) fileListComponent!: FileListComponent;
  @ViewChild(CategoryTableComponent) categoryTableComponent!: CategoryTableComponent;

  refreshData(): void {
    // Call the loadFiles() method of FileListComponent
    this.fileListComponent.loadFiles();

    // Call the fetchData() and fetchDvTermData() methods of CategoryTableComponent
    this.categoryTableComponent.fetchData();
    this.categoryTableComponent.fetchDvTermData();
  }
}
